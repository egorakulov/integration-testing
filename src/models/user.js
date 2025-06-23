const mongoose = require('mongoose');

// define user schema with name and email fields
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
});

// creeate user model from schema
const User = mongoose.model('User', userSchema);

module.exports = User;