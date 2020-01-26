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

dbController.createUser = (req, res, next) => {
  const { username, email, password } = res.locals.userInfo;

  let queryString = `
    INSERT INTO "users" ("username", "email", "password")
      VALUES('${username}', '${email}', '${password}')
      RETURNING "_id";
  `;

  db.query(queryString)
    .then(data => {
      res.locals.userData = data.rows[0];
      return next();
    })
    .catch(err => {
      console.log(`Error in dbController.addUser: ${err}`);
      res.locals.errors = 'Email already registered';
      return next(err);
    });
}

dbController.verifyUser = (req, res, next) => {
  const { email, password } = req.body;

  let queryString = `
    SELECT "password", "_id", "username" FROM "users"
    WHERE "email" = '${email}' 
  `;

  db.query(queryString)
    .then(data => {
      bcrypt.compare(password, data.rows[0].password, function (err, compareResults) {
        if (err) {
          console.log(`Error in verifyUser.compare: ${err}`);
          return next(err);
        } else if (!compareResults) {
          console.log(`No compareResults in verifyUser!!!`);
          res.next('ERROR');
        } else {
          res.locals._id = data.rows[0]._id;
          res.locals.username = data.rows[0].username;
          return next();
        }
      });
    })
    .catch(err => {
      console.log(`Error in dbController.verifyUser: ${err}`);
      return next(err);
    });
}

// data middleware
dbController.getUserData = (req, res, next) => {
  let queryString = `
    SELECT "entries"."_id" AS "entry_id", "project_id", "entries"."timestamp" AS "entry_timestamp", "elapsedTime", json_agg(json_build_object('task_id', "tasks"."_id", 'task_content', "content", 'task_timestamp', "tasks"."timestamp")) as "tasks"
    FROM "entries"
    JOIN "tasks" ON "tasks"."entry_id" = "entries"."_id"
    JOIN "projects" ON "projects"."_id" = "entries"."project_id"
    JOIN "users" ON "projects"."user_id" = "users"."_id"
    WHERE "users"."_id" = ${res.locals._id}
    GROUP BY "entries"."_id"
  `;
  
  db.query(queryString)
    .then(data => {
      console.log('data.rows from getUserData', data.rows);
      res.locals.entries = data.rows;
      return next();
    })
    .catch(err => {
      console.log(`Error in dbController.getUserData: ${err}`);
      return next(err);
    })
}

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
// `INSERT INTO users(username, email, password)
//   VALUES(
//     'bubba',
//     'bubba@gump.com',
//     'gump');
// `

// insert project
// `INSERT INTO projects(user_id, "projectName", color)
//   VALUES(
//     (select _id from users where username = 'bubba'),
//     'Banana Hut',
//     'red');
// `

// insert entry
// `INSERT INTO entries("project_id", timestamp, "elapsedTime")
//   VALUES(
//     (select _id from projects where _id = 1),
//     895965672,
//     4809);
// `

// insert task
// `INSERT INTO tasks(entry_id, content, timestamp)
//   VALUES(
//     (select _id from entries where _id = 1),
//     'Mutated the array',
//     92829801);
// `

module.exports = dbController;