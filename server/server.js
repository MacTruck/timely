const express = require('express');
const path = require('path');
// const mongoose = require('mongoose');

// Server Setup ---------------------------
const PORT = 3000;
const app = express();

// const connection = mongoose.connection;

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
  userController.hashPassword,
  userController.createUser,
  (req, res) => {
    res.sendStatus(200);
});

app.post('/login',
  userController.verifyUser,
  (req, res) => {
    res.status(200).json({ userData: res.locals.userData });
});

// Error Handling ---------------------
app.use('*', (req, res) => {
  console.log(err);
  res.status(404).send('404 Page Not Found');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('500 Internal Server Error');
});

// Start Server ---------------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});