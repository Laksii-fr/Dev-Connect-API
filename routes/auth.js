const express = require('express');
const router = express.Router();
const { User } = require('../models/auth_models');
const { signup } = require('../controllers/auth');
const { login } = require('../controllers/auth');

// POST /register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Create and save the new user
    // const newUser = new User({ username, password });

    //send data to controller
    await signup({ username, password });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    if (err.code === 11000) {  // Duplicate username
      res.status(409).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: 'Error registering user', error: err.message });
    }
  }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const data = await login({ username, password });
        res.status(200).json({ 
          Status : 'Success',
          Data: data,
          message: 'User logged in successfully' 
        });
    } catch (err) {
        return res.status(500).json({ 
          "status": False,
          "message": 'Error logging in', error: err.message,
          "data": None
        });
    }
});

module.exports = router;