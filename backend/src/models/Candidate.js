const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
  name: String,
  age: Number,
  description: String,
  image: String
});

module.exports = mongoose.model('Candidate', candidateSchema);
