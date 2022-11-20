const express = require('express')
const router = express.Router()
const BlogModel = require('../models/BlogModel')

// Middleware
router.use(express.static('public'))

router.get('', (req, res) => {
  const blogs = BlogModel.find().sort({createdAt: -1})
  .then(result => {
    res.render('index', {title: 'Home', blogs: result, msg: 'Message Sent'})
  })
  .catch(err => console.log(err))
})

router.post('', (req, res) => {
  const data = req.body
  const blog = new BlogModel({
    title: data.title,
    subtitle: data.subtitle,
    body: data.blogContent,
    blogerName: data.blogerName
  })
  blog.save()
  .then(() => {
    console.log('Saved to DB')
    res.redirect('/')
  })
  .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
  res.render('create', {title: 'Create Blog Post'})
})

router.get('/togglePosts', (req, res) => {
  BlogModel.find().sort({createdAt: -1})
  .then(result => {
    res.send(JSON.stringify(result))
  })
  .catch(err => console.log(err))
})


router.get('/:id', (req, res) => {
  const id = req.params.id
  BlogModel.findById(id)
  .then(result => {
    res.render('post', {title: result.title, blog: result})
  })
  .catch(err => console.log(err))
})

// Post Req for updating a blog
router.post('/:id', (req, res) => {
  const resData = req.body
  const id = req.params.id
  BlogModel.findByIdAndUpdate(id, {title: resData.title, subtitle: resData.subtitle, blogerName: resData.blogerName, body: resData.body})
  .catch(err => console.log(err))
  BlogModel.findById(id)
  .then(result => {
    console.log(result)
    res.render('post', {title: result.title, blog: result})
  })
  .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  BlogModel.findByIdAndDelete(id)
  .then(result => {
    res.json({path: '/blogs'})
  })
  .catch(err => console.log(err))
})

router.get('/:id/update', (req, res) => {
  const id = req.params.id
  BlogModel.findById(id)
  .then(result => {
    res.render('update', {title: 'Update Blog', blog: result})
  })
  .catch(err => console.log(err))
})

module.exports = router