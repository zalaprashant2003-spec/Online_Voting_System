const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: 'voter' }
})

module.exports = mongoose.model('User', userSchema)
