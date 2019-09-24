require('dotenv').config()
const express = require('express')
const axios = require('axios')
const path = require('path')
const logger = require('morgan')
const exphbs = require('express-handlebars')

// establishing the I/O port
const PORT = process.env.PORT || 3000
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views')) // specify that templates will live in the "views" directory
app.engine('.hbs', exphbs({extname: '.hbs'}))
app.set('view engine', '.hbs') // specify that we are using "handlebars" as our template engine

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log(`App is up and running listening on port ${PORT}`))

// route handler for GET request to home ("/") route
app.get('/', (req, res, next) => {
  // "render" the template named "home" in our views folder
  res.render('home')
})

app.get('/about', (req, res, next) => {
  // "render" the template named "home" in our views folder
  res.render('about')
})
