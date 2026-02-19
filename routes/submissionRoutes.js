const express = require("express");
const Submission = require("../models/Submission");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { code, language } = req.body;

    const submission = await Submission.create({
      userId: req.user.id,
      code,
      language
    });

    res.json(submission);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
