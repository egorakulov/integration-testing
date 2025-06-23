// simple Express application

const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');

const app = express();

// connect to mongoDB database
mongoose.connect('mongodb://localhost:27017/integration-testing', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// middleware to parse JSON requests
app.use(express.json());

// use the user router for any requests to /users
app.use('/users', userRouter);

module.exports = app;