const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL
const mongoURI = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for successful connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Handle connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;