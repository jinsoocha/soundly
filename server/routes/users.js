// users.js
const db = require('../db-config');
const User = require('../models/User.js');

module.exports.find = (req, res) => {
  // getting all users
  User.find({})
    .exec((err, users) => {
      if (err) {
        return console.error(err);
      }
      return res.json(users);
    });
};

