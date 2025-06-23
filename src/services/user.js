const User = require('../models/user');

// Function to create a new user
async function createUser(name, email) {
  const user = new User({ name, email });
  await user.save();
  return user;
}

// Function to get a user by email
async function getUserByEmail(email) {
  return User.findOne({ email });
}

module.exports = { createUser, getUserByEmail };