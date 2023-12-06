const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  // Add other properties as needed
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
