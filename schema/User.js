const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  lastname: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  dni: {
    type: Number,
    required: true,
    min: 1,
  },
  age: {
    type: Date,
    required: true,
    min: 1,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports.userSchema = mongoose.model('user', userSchema);
