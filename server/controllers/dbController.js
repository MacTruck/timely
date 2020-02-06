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
      res.locals.user_id = data.rows[0]._id;
      return next();
    })
    .catch(err => {
      console.log(`Error in dbController.createUser: ${err}`);
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
          res.locals.user_id = data.rows[0]._id;
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
    SELECT "entries"."_id" AS "entry_id", "projects"."_id" AS "project_id", "projects"."projectName", "entries"."timestamp" AS "entry_timestamp", "elapsedTime", json_agg(json_build_object('task_id', "tasks"."_id", 'task_content', "content", 'task_timestamp', "tasks"."timestamp")) AS "tasks"
    FROM "entries"
    JOIN "tasks" ON "tasks"."entry_id" = "entries"."_id"
    JOIN "projects" ON "projects"."_id" = "entries"."project_id"
    JOIN "users" ON "projects"."user_id" = "users"."_id"
    WHERE "users"."_id" = ${res.locals.user_id}
    GROUP BY "entries"."_id", "projects"."_id"
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

dbController.addProjects = (req, res, next) => {
  const { newEntry } = req.body;
  res.locals.user_id = req.body.user_id;
  if (!newEntry.project_id) {
    let queryString = `
    INSERT INTO "projects" ("user_id", "projectName")
    VALUES ((SELECT "_id" FROM "users" WHERE "_id" = ${req.body.user_id}), '${newEntry.projectName}')
    RETURNING "_id"
    `;

    db.query(queryString)
      .then(data => {
        res.locals.project_id = data.rows[0]._id;
        return next();
      })
      .catch(err => {
        console.log('Error in dbController.addProjects: ', err);
        return next(err);
      })
  } else {
    return next();
  }
}

dbController.addEntries = (req, res, next) => {
  const { newEntry } = req.body;
  let queryString = `
    INSERT INTO "entries" ("project_id", "timestamp", "elapsedTime")
    VALUES ((SELECT "_id" FROM "projects" WHERE "_id" = ${res.locals.project_id}), ${newEntry.entry_timestamp}, ${newEntry.elapsedTime})
    RETURNING "_id"
  `;

  db.query(queryString)
    .then(data => {
      res.locals.entry_id = data.rows[0]._id;
      return next();
    })
    .catch(err => {
      console.log('Error in dbController.addEntries: ', err);
      return next(err);
    })
}

dbController.addTasks = (req, res, next) => {
  const { newEntry } = req.body;
  let queryString = ``;
  newEntry.tasks.forEach(task => {
    queryString += `
      INSERT INTO "tasks" ("entry_id", "content", "timestamp")
      VALUES ((SELECT "_id" FROM "entries" WHERE "_id" = ${res.locals.entry_id}), '${task.task_content}', ${task.task_timestamp});
    `;
  })

  db.query(queryString)
    .then(data => {
      return next();
    })
    .catch(err => {
      console.log('Error in dbController.addTasks: ', err);
      return next(err);
    })
}

dbController.updateEntry = (req, res, next) => {
  let queryString = '';
}

dbController.deleteEntry = (req, res, next) => {
  let queryString = '';
}

module.exports = dbController;