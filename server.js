const express = require('express')
const controllers = require('./controllers')
const sequelize = require('./config/connection')
const path = require('path')

// set up handlebars
const exphbs = require('express-handlebars')
const hbs = exphbs.create({})

// set up app
const app = express()
const PORT = process.env.PORT || 3001

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// handlebars as default
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// turn on controllers
app.use(controllers)

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})