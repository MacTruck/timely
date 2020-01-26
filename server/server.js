const express = require('express');
const path = require('path');
// const mongoose = require('mongoose');

// Server Setup ---------------------------
const PORT = 3000;
const app = express();

// Import Controllers
const userController = require('./controllers/userController');
const dbController = require('./controllers/dbController.js');

// File Handling --------------------------
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('.'));

// Server index.html ----------------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Routes for signup and login ----------------------
app.post('/signUp', 
  dbController.hashPassword,
  dbController.createUser,
  (req, res) => {
    res.status(200).json({ userData: res.locals.userData });
});

app.post('/login',
  dbController.verifyUser,
  dbController.getUserData,
  // userController.addEntriesOnLogin,
  (req, res) => {
    res.status(200).json({ userData: res.locals.userData });
});

// Routes for entry submit and update
app.post('/submitEntry',
  userController.addEntry,
  (req, res) => {
    res.sendStatus(200);
});

app.post('/removeEntry',
  userController.removeEntry,
  (req, res) => {
    res.sendStatus(200);
});

// Error Handling ---------------------
app.use('*', (req, res) => {
  console.log('404 error: ', err);
  res.status(404).send('404 Page Not Found');
});

app.use((err, req, res, next) => {
  console.log('global error handler: ', err);
  if (res.locals.errors) {
    res.status(500).json({ errors: res.locals.errors });
  } else {
    res.status(500).send('500 Internal Server Error');
  }
});

// Start Server ---------------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});