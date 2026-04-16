const session = require('express-session')
const express = require('express')
const filasRouter = require('./server/routes/filas')
const path = require('path')
require('dotenv').config()
const authRouter = require('./server/routes/auth')
const app = express()
const PORT = process.env.PORT || 3000



app.set('view engine','ejs')

app.set('views', './views')

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({ extended: true }))// lê forms HTML

app.use(express.json())// lê JSON (útil depois)

app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}))

function requireAuth(req, res, next) {
   if (!req.session.usuario) return res.redirect('/')
   next()
}

app.use('/', authRouter)
app.use('/', requireAuth, filasRouter)

app.listen(PORT, () => {
   console.log("Running at http://localhost:" + PORT);
})
