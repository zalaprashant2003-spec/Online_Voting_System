const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const Election = require('../models/Election');
const Candidate = require('../models/Candidate');

const router = express.Router();
const uploadDir = path.join(__dirname, '../uploads');

// Ensure uploads dir exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Create new election
router.post('/', (req, res) => {
  const form = new formidable.IncomingForm({ multiples: false });
  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ message: 'Upload error' });

    try {
      const file = files.image?.[0];
      let filename = '';
      if (file) {
        const ext = path.extname(file.originalFilename);
        const newName = Date.now() + ext;
        const newPath = path.join(uploadDir, newName);
        fs.renameSync(file.filepath, newPath);
        filename = newName;
      }

      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;

      const election = new Election({ name, image: filename, status: 'pending' });
      await election.save();
      res.json(election);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
});

// Get all elections (Admin)
router.get('/', async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get only running elections (Voter)
router.get('/running', async (req, res) => {
  try {
    const runningElections = await Election.find({ status: 'start' });
    res.json(runningElections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start election
router.put('/:id/start', async (req, res) => {
  try {
    const updated = await Election.findByIdAndUpdate(
      req.params.id,
      { status: 'start' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error starting election' });
  }
});

// End election
router.put('/:id/end', async (req, res) => {
  try {
    const updated = await Election.findByIdAndUpdate(
      req.params.id,
      { status: 'end' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error ending election' });
  }
});

// Delete election (and its candidates)
router.delete('/:id', async (req, res) => {
  try {
    await Election.findByIdAndDelete(req.params.id);
    await Candidate.deleteMany({ election: req.params.id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting election' });
  }
});

module.exports = router;
