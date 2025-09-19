const express = require('express');
const pool = require('./db'); // your db.js
require('dotenv').config();

const app = express();
app.use(express.json());

// ✅ Get all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ✅ Get all bugs
app.get('/bugs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bugs');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ✅ Get all test cases
app.get('/testcases', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM test_cases');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ✅ Get all feedback
app.get('/feedback', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM feedback');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
