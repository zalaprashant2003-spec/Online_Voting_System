const express = require("express");
const mongoose = require("mongoose"); // ✅ ADD THIS
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");
const router = express.Router();

router.get("/:electionId", async (req, res) => {
  const { electionId } = req.params;

  try {
    const results = await Vote.aggregate([
      { $match: { electionId: new mongoose.Types.ObjectId(electionId) } },
      { $group: { _id: "$candidateId", votes: { $sum: 1 } } },
      { $sort: { votes: -1 } }
    ]);

    if (results.length === 0) {
      return res.json({ results: [], winner: null });
    }

    const detailedResults = await Promise.all(
      results.map(async (r) => {
        const candidate = await Candidate.findById(r._id);
        return {
          candidateId: r._id,
          name: candidate?.name,
          image: candidate?.image,
          description: candidate?.description,
          votes: r.votes,
        };
      })
    );

    const winner = detailedResults[0];
    res.json({ results: detailedResults, winner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
