const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const path = require('path')

// set up app
const app = express()
const PORT = process.env.PORT || 3001

// set up sequelize with session
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
  secret: 'Secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

app.use(session(sess))

// get helper function(s)
const helpers = require('./utils/helpers')

// create handlebars with access to helpers
const hbs = exphbs.create({ helpers })

// handlebars as default
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

const controllers = require('./controllers')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))



// turn on controllers
app.use(controllers)

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})