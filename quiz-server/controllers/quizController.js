//controllers/quizController.js
const Quiz = require('../models/Quiz');

const isAdmin = (req, res, next) => {
  // Assuming you have a user object attached to the request
  const user = req.user;

  // Check if the user has admin privileges
  if (user && user.isAdmin) {
    // User is an admin, allow the request to proceed
    next();
  } else {
    // User is not an admin, send a forbidden response
    res.status(403).json({ error: 'Forbidden - Admin access required' });
  }
};

module.exports = {
  getAllQuizzes: async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.status(200).json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  createQuiz: async (req, res) => {
    try {
      // Destructure the correct fields from req.body
      const { question, options, answer, timeLimit } = req.body;
      const quiz = new Quiz({ question, options, answer, timeLimit });
      await quiz.save();
      res.status(201).json({ message: 'Quiz created successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateQuiz: [isAdmin, async (req, res) => {
    try {
      // Access the quiz ID from req.params.id
      const quizId = req.params.id;

      // Destructure the fields you want to update from req.body
      const { question, options, answer, timeLimit } = req.body;

      // Find the quiz by ID and update its fields
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        quizId,
        { question, options, answer, timeLimit },
        { new: true } // This option returns the updated document
      );

      if (!updatedQuiz) {
        // If the quiz with the given ID is not found
        return res.status(404).json({ error: 'Quiz not found' });
      }

      res.status(200).json({ message: 'Quiz updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }],

  deleteQuiz: [isAdmin, async (req, res) => {
    try {
      // Access the quiz ID from req.params.id
      const quizId = req.params.id;

      // Find the quiz by ID and delete it
      const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

      if (!deletedQuiz) {
        // If the quiz with the given ID is not found
        return res.status(404).json({ error: 'Quiz not found' });
      }

      res.status(200).json({ message: 'Quiz deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }],
};
