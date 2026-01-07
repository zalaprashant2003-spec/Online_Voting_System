const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  status: {
    type: String,
    enum: ['pending', 'start', 'end'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Election', electionSchema);
