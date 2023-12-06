const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const resultRoutes = require('./routes/resultRoutes');
const User = require('./models/User'); // Assuming you have a User model
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(session({ secret: 'my-default-secret-key', resave: true, saveUninitialized: true }));

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(
  () => console.log("MongoDB IS Connected")
  ).catch(err => console.log(err));


// JWT Middleware for Authentication
const authenticateJWT = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  const tokenArray = authorizationHeader.split(' ');

  if (tokenArray.length !== 2 || tokenArray[0].toLowerCase() !== 'bearer') {
    return res.status(403).json({ error: "Invalid authorization header format" });
  }

  const token = tokenArray[1];

  jwt.verify(token, 'my-default-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
    req.user = user;
    next();
  });
};


// Routes
app.use('/auth', authRoutes);
app.use('/quiz', authenticateJWT, quizRoutes);
app.use('/question', authenticateJWT, questionRoutes);
app.use('/result', authenticateJWT, resultRoutes);

// Start the server
const port = 3004
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
