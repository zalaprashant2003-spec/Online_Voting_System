const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const electionRoutes = require('./routes/electionRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const voteRoutes = require('./routes/voteRoutes');
const resultRoutes = require('./routes/resultRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use('/user', userRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/votes', voteRoutes);
app.use('/api/results', require('./routes/resultRoutes'));
app.get('/', (req, res) => {
  res.send('Server is working');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
