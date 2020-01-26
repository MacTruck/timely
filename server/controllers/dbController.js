const bcrypt = require('bcryptjs');
const db = require('../models/dbModel.js');

const dbController = {};

// user middleware
dbController.hashPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      console.log(`Error in bcryptify: ${err}`);
      return next(err);
    } else {
      res.locals.userInfo = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
      }
      return next();
    }
  });
}

dbController.addUser = (req, res, next) => {
  let queryString = '';
}

dbController.verifyUser = (req, res, next) => {}

// data middleware
dbController.addEntry = (req, res, next) => {
  let queryString = '';
}

dbController.getEntries = (req, res, next) => {
  let queryString = '';
}

dbController.updateEntry = (req, res, next) => {
  let queryString = '';
}

dbController.deleteEntry = (req, res, next) => {
  let queryString = '';
}

// insert user
`INSERT INTO users(username, email, password)
  VALUES(
    'bubba',
    'bubba@gump.com',
    'gump');
`

// insert project
`INSERT INTO projects(user_id, "projectName", color)
  VALUES(
    (select _id from users where username = 'bubba'),
    'Banana Hut',
    'red');
`

// insert entry
`INSERT INTO entries("project_id", timestamp, "elapsedTime")
  VALUES(
    (select _id from projects where _id = 1),
    895965672,
    4809);
`

// insert task
`INSERT INTO tasks(entry_id, content, timestamp)
  VALUES(
    (select _id from entries where _id = 1),
    'Mutated the array',
    92829801);
`

export default dbController;