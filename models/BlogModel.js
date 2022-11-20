const mongoose = require('mongoose')
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  blogerName: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
}, {timestamps: true, timeseries: true})

const BlogModel = mongoose.model('blogs', BlogSchema)

module.exports = BlogModel