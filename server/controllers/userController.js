const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');

const userController = {};

// Bcrypt password for signup
userController.hashPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      console.log(`Error in bcryptify: ${err}`);
      return next(err);
    } else {
      res.locals.userInfo = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      }
      return next();
    }
  });
}

// Create new user
userController.createUser = (req, res, next) => {
  const { name, email, password } = res.locals.userInfo;
  User.create({ email, password, name }, function (err, data) {
    if (err) {
      console.log(`Error in createUser: ${err}`);
      return next(err);
    } else {
      res.locals._id = data._id;
      return next();
    }
  });
}

// Verify login credentials
userController.verifyUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, data) {
    if (err) {
      console.log(`Error in verifyUser: ${err}`);
      return next(err);
    } else if (data === null) {
      console.log('Error in verifyUser: User not found');
      return next();	// rerender login screen with error message
    } else {
      bcrypt.compare(password, data.password, function (err, compareResults) {
        if (err) {
          console.log(`Error in verifyUser.compare: ${err}`);
          return next(err);
        } else if (!compareResults) {
          console.log(`No compareResults in verifyUser!!!`);
          res.next('ERROR');
        } else {
          res.locals.userData = data;
          return next();
        }
      });
    }
  });
}

// Add entry to db
userController.addEntry = (req, res, next) => {
  const { newEntry, email } = req.body;
  User.findOneAndUpdate({ email }, {"$push": { entries: newEntry }}, function (err, data) {
    if (err) {
      console.log(`Error in addEntry: ${err}`);
      return next(err);
    } else if (data === null) {
      console.log(`Error in addEntry: User not found`);
      return next();
    } else {
      console.log('Entry added successfully');
    }
  })
}

module.exports = userController;