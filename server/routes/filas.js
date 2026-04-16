const router = require('express').Router()
const pool = require('../db')

// ── CRIAR FILA ───────────────────────────────────────────────────────────────

router.get('/filas/nova', (req, res) => {
    res.render('nova-fila')
})

router.post('/filas/nova', async (req, res) => {
    try {
        const { nome, descricao } = req.body
        await pool.query(
            'INSERT INTO filas (nome, descricao, usuario_id, status, criada_em) VALUES ($1, $2, $3, $4, NOW())',
            [nome, descricao, req.session.usuario.id, 'ativa']
        )
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.redirect('/filas/nova?erro=Erro+ao+criar+fila')
    }
})

// ── GERENCIAR FILA (ADMIN) ───────────────────────────────────────────────────

router.get('/filas/:id', async (req, res) => {
    try {
        const filaRes = await pool.query(
            'SELECT * FROM filas WHERE id = $1 AND usuario_id = $2',
            [req.params.id, req.session.usuario.id]
        )

        if (filaRes.rows.length === 0) return res.redirect('/dashboard')

        const clientesRes = await pool.query(
            `SELECT sf.id, sf.posicao, sf.status, u.nome
             FROM senhas_fila sf
             JOIN usuarios u ON u.id = sf.usuario_id
             WHERE sf.fila_id = $1
             ORDER BY sf.posicao ASC`,
            [req.params.id]
        )

        res.render('fila-admin', {
            fila: filaRes.rows[0],
            clientes: clientesRes.rows
        })
    } catch (err) {
        console.error(err)
        res.redirect('/dashboard')
    }
})

router.post('/filas/:id/chamar', async (req, res) => {
    try {
        await pool.query(
            `UPDATE senhas_fila SET status = 'chamado'
             WHERE id = (
               SELECT id FROM senhas_fila
               WHERE fila_id = $1 AND status = 'aguardando'
               ORDER BY posicao ASC LIMIT 1
             )`,
            [req.params.id]
        )
        res.redirect('/filas/' + req.params.id)
    } catch (err) {
        console.error(err)
        res.redirect('/filas/' + req.params.id)
    }
})

// ── PÁGINA DO CLIENTE ────────────────────────────────────────────────────────

router.get('/cliente/:filaId', async (req, res) => {
    try {
        const filaRes = await pool.query(
            'SELECT * FROM filas WHERE id = $1',
            [req.params.filaId]
        )
        if (filaRes.rows.length === 0) return res.redirect('/dashboard')

        const minhaRes = await pool.query(
            `SELECT sf.posicao, sf.status,
                    (SELECT COUNT(*) FROM senhas_fila
                     WHERE fila_id = $1 AND status = 'aguardando' AND posicao <= sf.posicao) AS pos_atual
             FROM senhas_fila sf
             WHERE sf.fila_id = $1 AND sf.usuario_id = $2 AND sf.status != 'finalizado'
             LIMIT 1`,
            [req.params.filaId, req.session.usuario.id]
        )

        res.render('cliente', {
            fila: filaRes.rows[0],
            minhaSenha: minhaRes.rows[0] || null
        })
    } catch (err) {
        console.error(err)
        res.redirect('/dashboard')
    }
})

router.post('/cliente/:filaId/entrar', async (req, res) => {
    try {
        const jaEsta = await pool.query(
            `SELECT id FROM senhas_fila
             WHERE fila_id = $1 AND usuario_id = $2 AND status != 'finalizado'`,
            [req.params.filaId, req.session.usuario.id]
        )
        if (jaEsta.rows.length > 0) return res.redirect('/cliente/' + req.params.filaId)

        const posRes = await pool.query(
            `SELECT COUNT(*) + 1 AS proxima FROM senhas_fila
             WHERE fila_id = $1 AND status = 'aguardando'`,
            [req.params.filaId]
        )
        const posicao = posRes.rows[0].proxima

        await pool.query(
            `INSERT INTO senhas_fila (usuario_id, fila_id, posicao, status, criado_em)
             VALUES ($1, $2, $3, 'aguardando', NOW())`,
            [req.session.usuario.id, req.params.filaId, posicao]
        )

        res.redirect('/cliente/' + req.params.filaId)
    } catch (err) {
        console.error(err)
        res.redirect('/cliente/' + req.params.filaId)
    }
})

module.exports = router
