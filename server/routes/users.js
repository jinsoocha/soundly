// users.js
const db = require('../db-config');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
// module.exports.find = (req, res) => {
//   // getting all users
//   User.find({})
//     .exec((err, users) => {
//       if (err) {
//         return console.error(err);
//       }
//       return res.json(users);
//     });
// };

const generateToken = (username) => {
  const token = jwt.sign({ username }, 'TODO:SECRET', {
    expiresIn: 60 * 60 * 12,
  });
  console.log(token);
  return token;
};
const generateRoomId = (username, cb) => {
  const ObjectId = mongoose.Types.ObjectId.toString();
  const potentialRoomId = ObjectId.slice(0, 5);
  User.find({ roomid: potentialRoomId }, (err, results) => {
    console.log('results:', results.length);
    if (err) {
      console.log('err', err);
    }
    // TODO
    if (results.length === 0) {
      cb(potentialRoomId);
    } else {
      cb('blah');
    }
  });
};


const signin = (username, password, cb) => {
  User.findOne({ username: username })
    .exec((err, user) => {
      if (err) {
        return cb(err);
      }

      if (user === undefined || user === null) {
        console.log('user does not exist');
        return cb(null, null);
      }
      bcrypt.compare(password, user.password, (comperr, res) => {
        console.log('comperr', comperr);
        console.log('res:', res);

        if (comperr) {
          return cb(err);
        }

        if (!res) {
          return cb('bad password');
        }
        const returnUser = {
          username: user.username,
          roomId: user.roomId,
        };

        return cb(null, returnUser);
      });
    });
};

module.exports.signup = (req, res) => {
  // signup
  const username = req.body.username;
  const password = req.body.password;

  console.log('username: ', username);
  User.find({ username: username }, (err, users) => {
    if (err) {
      console.log('error finding username:', username);
    }
    if (users.length > 0) {
      res.json({ message: 'user already exists' });
    } else {
      bcrypt.hash(password, 1, (hashErr, hash) => {
        if (hashErr) {
          console.log('error generating password ', hashErr);
          return res.json({ message: 'can\'t generate password' });
        }
        generateRoomId(username, (uniqueRoomId) => {
          const makeUser = new User({ username: username, password: hash, roomid: uniqueRoomId });
          makeUser.save((saveErr, saveResult) => {
            const returnUser = {
              username: makeUser.username,
              roomid: makeUser.roomid,
              token: generateToken(username),
            };
            return res.json(returnUser);
          });
        });
      });
    }
  });
};

module.exports.signin = (req, res) => {
  // signin

  const username = req.body.username;
  const password = req.body.password;

  signin(username, password, (err, user) => {
    if (err || user === null) {
      return res.json({ username: '', token: '', roomId: '' });
    }

    user.token = generateToken(username);
    console.log(user);
    return res.json(user);
  });
};
