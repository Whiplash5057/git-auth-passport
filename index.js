// -- Main starting point of the app
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

// - imports
const router = require('./routes/router')
const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')

// - instance
const app = express()

// - mongodb
// mongoose.openUri()
mongoose.Promise = Promise
mongoose.connect(keys.mongodb.dbURI, { useMongoClient: true })
.then(() => { console.log('connected to mongodb') })
.catch(err => console.error(err));

// - setup view engine
app.set('view engine', 'ejs')

// - setup session
app.use(cookieSession({
    maxAge: 24*60*60*1000, // one day
    keys: [keys.session.cookieKey]
}))

// - initialize passport
app.use(passport.initialize())
app.use(passport.session())

// -- App setup
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// -- Server setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('server listening to :', port)
