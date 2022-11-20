// Imports
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const BlogRoutes = require('./routes/blogRoutes')
const ContactRoutes = require('./routes/contactRoutes')
const port = process.env.port || 4040

// Middleware for setup
app.use(morgan('dev'))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

// Connecting to db and listening
const dbURI = 'mongodb://localhost:27017/gito-blogs'
mongoose.connect(dbURI, err => {
  if (err) console.log(err)
  app.listen(port, () => console.log('Connected & Listening'))
})

// Routes
app.get('/', (req, res) => {
  res.status(301).redirect('/blogs')
})
  // Blog Routes
app.use('/blogs', BlogRoutes)

  // About Routes
app.get('/about', (req, res) => {
  res.render('about', {title: 'About Me'})
})
app.get('/about-gito' , (req, res) => {
  res.status(301).redirect('/about')
})

  // Contact Routes
app.use('/contact', ContactRoutes)

// 404 handling
app.use((req, res) => {
  res.status(404).render('404', {title: 'Page Unavailable'})
})