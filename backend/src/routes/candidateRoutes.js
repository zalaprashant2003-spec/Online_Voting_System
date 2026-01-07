const express = require('express');
const formidable = require('formidable');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Candidate = require('../models/Candidate');

const router = express.Router();
const uploadDir = path.join(__dirname, '../uploads');
// const candidates = await Candidate.find({ election: req.params.id })
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

router.post('/:electionId', (req, res) => {
  const form = new formidable.IncomingForm({ multiples: false });
  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ message: 'Upload error' });

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
    const age = Array.isArray(fields.age) ? fields.age[0] : fields.age;
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;

    const candidate = new Candidate({
      election: req.params.electionId,
      name,
      age,
      description,
      image: filename
    });
    await candidate.save();
    res.json(candidate);
  });
});

// router.get('/:electionId', async (req, res) => {
//   const candidates = await Candidate.find({ election: req.params.electionId });
//   res.json(candidates);
// });
router.get('/:id', async (req, res) => {
   const electionId = req.params.id;
   const candidates = await Candidate.find({ election: electionId });
   res.json(candidates);
});

router.put('/:id', (req, res) => {
  const form = new formidable.IncomingForm({ multiples: false });
  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ message: 'Upload error' });

    const file = files.image?.[0];
    let filename = fields.oldImage;

    if (file) {
      const ext = path.extname(file.originalFilename);
      const newName = Date.now() + ext;
      const newPath = path.join(uploadDir, newName);
      fs.renameSync(file.filepath, newPath);
      filename = newName;
    }

    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const age = Array.isArray(fields.age) ? fields.age[0] : fields.age;
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;

    const updated = await Candidate.findByIdAndUpdate(
      req.params.id,
      { name, age, description, image: filename },
      { new: true }
    );

    res.json(updated);
  });
});

router.delete('/:id', async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);
  res.json({ message: 'Candidate deleted' });
});

module.exports = router;
