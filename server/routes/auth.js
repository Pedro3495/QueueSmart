const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('login')
})

router.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

router.get('/acessibilidade', (req, res) => {
    res.render('acessibilidade')
})

module.exports = router