const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const ContactModel = require('../models/ContactModel')

// Middleware
router.use(express.static('public'))

router.get('', (req, res) => {
  res.render('contact', {title: 'Find Me'})
})

router.post('', (req, res) => {
  const data = req.body
  const contactData = new ContactModel({
    name: data.name,
    email: data.email,
    phoneNumber: data.tel,
    message: data.message
  })
  contactData.save()
  .then((result) => {
    console.log(result)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'radigidi@gmail.com',
        pass: 'uxtztvhepuybiisu'
      }
    });
    
    const mailOptions = {
      from: result.email,
      to: 'radigidi@gmail.com',
      subject: 'Contacting You From Blog Site',
      text: result.message
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.redirect('/blogs')
  })
  .catch(err => console.log(err))
})

module.exports = router