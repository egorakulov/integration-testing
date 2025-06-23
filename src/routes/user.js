const express = require('express');
const { createUser, getUserByEmail } = require('../services/user');

const router = express.Router();

// Route to create a new user
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await createUser(name, email);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get a user by email
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUserByEmail(email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;