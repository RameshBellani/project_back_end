// auth/resultRoutes.js
const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// Add a new result
router.post('/add-result', async (req, res) => {
  try {
    const { quizId, userId, score } = req.body;

    // Assuming you have a Quiz and User model
    // You may need to modify these lines based on your actual models
    const quizExists = await Quiz.findById(quizId);
    const userExists = await User.findById(userId);

    if (!quizExists || !userExists) {
      return res.status(404).json({ error: 'Quiz or User not found' });
    }

    const result = new Result({ quizId, userId, score });
    await result.save();

    res.status(201).json({ message: 'Result added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve quiz results based on quizId
router.get('/:quizId/results', async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const results = await Result.find({ quizId });
    res.json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Calculate and retrieve the average score for a quiz
router.get('/:quizId/average-score', async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const results = await Result.find({ quizId });

    if (results.length === 0) {
      return res.json({ averageScore: 0 });
    }

    const totalScore = results.reduce((acc, result) => acc + result.score, 0);
    const averageScore = totalScore / results.length;

    res.json({ averageScore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
