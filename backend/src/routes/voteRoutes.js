const express = require('express');
const Vote = require('../models/Vote');
const router = express.Router();

// Cast vote
router.post('/', async (req, res) => {
  try {
    const { voterId, electionId, candidateId } = req.body;

    // Prevent double voting in same election
    const alreadyVoted = await Vote.findOne({ voterId, electionId });
    if (alreadyVoted) {
      return res.status(400).json({ message: 'You have already voted in this election' });
    }

    const vote = new Vote({ voterId, electionId, candidateId });
    await vote.save();

    res.json({ success: true, message: 'Vote recorded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
