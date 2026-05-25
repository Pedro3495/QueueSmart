const router = require('express').Router()
const bcrypt = require('bcrypt')
const pool = require('../db')

router.post('/cadastro', async (req, res) => {
    try {
        const { nome, email, senha, confirmarSenha } = req.body

        if (senha !== confirmarSenha) {
            return res.redirect('/cadastro?erro=As+senhas+não+coincidem.')
        }

        const hash = await bcrypt.hash(senha, 10)

        await pool.query(   
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
            [nome, email, hash]
        )

        res.redirect('/')
    } catch (err) {
        console.error(err)
        res.redirect('/cadastro?erro=E-mail+já+cadastrado+ou+erro+ao+cadastrar.')
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body

        const resultado = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        )

        if (resultado.rows.length === 0) {
            return res.redirect('/?erro=E-mail+não+encontrado.')
        }

        const usuario = resultado.rows[0]
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

        if (!senhaCorreta) {
            return res.redirect('/?erro=Senha+incorreta.')
        }

        req.session.usuario = { id: usuario.id, nome: usuario.nome }
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.redirect('/?erro=Erro+ao+fazer+login.+Tente+novamente.')
    }
})

router.get('/dashboard', async (req, res) => {
    if (!req.session.usuario) return res.redirect('/')
    try {
        const resultado = await pool.query(
            'SELECT * FROM filas WHERE usuario_id = $1 ORDER BY criada_em ASC',
            [req.session.usuario.id]
        )
        res.render('dashboard', {
            usuario: req.session.usuario,
            filas: resultado.rows
        })
    } catch (err) {
        console.error(err)
        res.send('Erro ao carregar o painel.')
    }
})

router.get('/sair', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.get('/painel', (req, res) => {
    res.redirect('/dashboard')
})

router.get('/painel/:filaId', async (req, res) => {
    try {
        const filaRes = await pool.query(
            'SELECT * FROM filas WHERE id = $1',
            [req.params.filaId]
        )

        if (filaRes.r   ows.length === 0) {
            return res.redirect('/')
        }

        const clientesRes = await pool.query(
            `SELECT sf.id, sf.posicao, sf.status, u.nome
             FROM senhas_fila sf
             JOIN usuarios u ON u.id = sf.usuario_id
             WHERE sf.fila_id = $1 AND sf.status != 'finalizado'
             ORDER BY sf.posicao ASC`,
            [req.params.filaId]
        )

        const clientes = clientesRes.rows
        const aguardando = clientes.filter(cliente => cliente.status === 'aguardando')
        const chamados = clientes.filter(cliente => cliente.status === 'chamado')

        res.render('painel', {
            fila: filaRes.rows[0],
            aguardando,
            chamados,
            chamadoAtual: chamados[chamados.length - 1] || null
        })
    } catch (err) {
        console.error(err)
        res.redirect('/')
    }
})

router.get('/', (req, res) => {
    res.render('login', { erro: req.query.erro || null })
})
router.get('/cadastro', (req, res) => {
    res.render('cadastro', { erro: req.query.erro || null })
})
router.get('/acessibilidade', (req, res) => {
    res.render('acessibilidade')
})

module.exports = router
