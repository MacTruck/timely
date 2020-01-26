const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect to DB
const { MONGO_URI } = require('../../config.js');
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(error => console.log('Connection failed: ', error));

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String },
  entries: [],
});

const entrySchema = new Schema({
  project: { type: String },
  timestamp: { type: Number },
  elapsedTime: { type: Number },
  tasks: [],
});

const task = new Schema({
  content: { type: String },
});

module.exports = mongoose.model('User', userSchema, 'users');