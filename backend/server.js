// Import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// configure .env which allows use of a .env file to store environment variables
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// activate cors and json middleware
app.use(cors());
app.use(express.json());

// Set up mongodb connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open',  () => {
    console.log('MongoDB database connection established successfully');
});

// Set up routes for database operations to distinct files 
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exerciseRouter);
app.use('/users',usersRouter);

// Start the server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});