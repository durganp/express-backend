const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please provide name'],
    },
    email: {
      type: String,
      require: [true, 'please provide email address'],
      unique: [true, 'Email is already taken'],
    },
    password: {
      type: String,
      require: [true, 'please provide password'],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model('User', userSchema);
