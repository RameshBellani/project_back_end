const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Create a new question
router.post('/create', async (req, res) => {
  try {
    const { question, options, answer, timeLimit } = req.body;
    const Question = new Quiz({ question, options, answer, timeLimit });
    await Question.save();
    res.json({ message: 'Question created successfully', Question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a question by ID
router.put('/:id/update', async (req, res) => {
  try {
    const questionId = req.params.id;
    const { question, options, answer, timeLimit } = req.body;

    const updatedQuestion = await Quiz.findByIdAndUpdate(
      questionId,
      { question, options, answer, timeLimit },
      { new: true } // Return the updated document
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json({ message: 'Question updated successfully', question: updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a question by ID
router.delete('/:id/delete', async (req, res) => {
  try {
    const questionId = req.params.id;

    const deletedQuestion = await Quiz.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
