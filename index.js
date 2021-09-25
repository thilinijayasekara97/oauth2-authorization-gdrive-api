const express = require('express')
const session = require('express-session')
const passport = require('passport')

require('./oauth2')

function isLoggedIn(req, res, next) {
    req.user ? next() : res.send(401);
}

const app = express()
app.use(session({ secret: 'cats' }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>')
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get('/auth/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
)

app.get('/auth/failure', (req, res) => {
    res.send('Authentication failed!')
})

app.get('/protected', (req, res) => {
    console.log('fddfjdf')
    res.send('HelloWorld!')
})

app.get('/logout', (req, res) => {
    req.logOut();
    res.send('GoodBye!')
})

app.listen(5000, () => console.log('server started on: 5000'))