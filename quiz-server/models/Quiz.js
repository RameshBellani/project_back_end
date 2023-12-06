//models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    { type: String, required: true }, // option1
    { type: String, required: true }, // option2
    { type: String, required: true }, // option3
    { type: String, required: true }, // option4
  ],
  answer: { type: String, required: true },
  timeLimit: { type: Number, required: true }, // Time limit for the question in seconds
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
