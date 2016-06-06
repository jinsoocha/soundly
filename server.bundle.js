/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var express = __webpack_require__(1);
	var app = express();
	var http = __webpack_require__(2).Server(app);
	var io = __webpack_require__(3)(http);
	var path = __webpack_require__(4);

	// serving index.html on client side
	// You do not need to use app.get('/'...) because it is taken care of by ReactRouter
	app.use(express.static(path.resolve(__dirname + '/../compiled')));
	app.use(express.static(path.resolve(__dirname + '/../node_modules')));

	__webpack_require__(5)(app, express);

	__webpack_require__(8)(app, express);

	__webpack_require__(21)(app, express, http, io);

	var port = process.env.PORT || 4568;

	http.listen(port, function () {
	  console.log('Music happening on =>', port);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//  middleware.js

	var bodyParser = __webpack_require__(6);
	var morgan = __webpack_require__(7);

	module.exports = function (app, express) {
	  app.use(morgan('dev'));

	  // we need this to receive the search input data from the client side
	  app.use(bodyParser.urlencoded({ extended: true }));
	  app.use(bodyParser.json());
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//  routes.js
	var users = __webpack_require__(9);
	var songs = __webpack_require__(15);
	var queue = __webpack_require__(17);
	var soundcloud = __webpack_require__(18);

	module.exports = function (app, express) {
	  //  Fall-through route
	  //  Users
	  app.post('/api/users/signup', users.signup);
	  app.post('/api/users/signin', users.signin);
	  //  Song Find
	  app.get('/songs', songs.find);
	  // when the client posts the search input, server receives and makes an api call to
	  // get the corresponding tracks
	  app.post('/server', soundcloud.get);
	  // when you go to localhost:4568/server you will see the data the server is holding if any.
	  app.get('/server', soundcloud.server);

	  //  Queue Routes
	  //  Get all songs in queue
	  app.get('/api/queue/getQueue', queue.getSongQueue);
	  //  Remove first song from queue since it finished playing
	  app.post('/api/queue/songFinished', queue.firstSongFinished);
	  //  Passes song object to add to queue at end.
	  app.post('/api/queue/addSong', queue.addSongToQueue);
	  //  Passes array index of song to increase in rank.
	  app.post('/api/queue/increaseRank', queue.increaseSongRanking);
	  //  Passes array index of song to decrease in rank.
	  app.post('/api/queue/decreaseRank', queue.decreaseSongRanking);
	  //  Passes array index of song to move up in queue.
	  app.post('/api/queue/moveUpInQueue', queue.moveUpInQueue);
	  //  Passes array index of song to move down in queue.
	  app.post('/api/queue/moveDownInQueue', queue.moveDownInQueue);
	  //  Passes array index of song to remove from queue
	  app.post('/api/queue/removeSong', queue.removeSongFromQueue);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// users.js
	var db = __webpack_require__(10);
	var User = __webpack_require__(12);
	var jwt = __webpack_require__(13);
	var bcrypt = __webpack_require__(14);
	var mongoose = __webpack_require__(11);

	var generateToken = function generateToken(username) {
	  var token = jwt.sign({ username: username }, 'TODO:SECRET', {
	    expiresIn: 60 * 60 * 12
	  });
	  //  console.log(token);
	  return token;
	};

	//  TODO: Find way to keep looping till we find a unique id
	var generateRoomId = function generateRoomId(username) {
	  return new Promise(function (resolve, reject) {
	    var objId = mongoose.Types.ObjectId().toString();
	    var potentialRoomId = objId.slice(0, 5) + objId.slice(objId.length - 1);
	    User.find({ roomid: potentialRoomId }, function (err, results) {
	      //  console.log('results:', results.length);
	      if (err) {
	        reject(err);
	      }
	      // TODO
	      if (results.length === 0) {
	        resolve(potentialRoomId);
	      } else {
	        reject('roomid already exists');
	      }
	    });
	  });
	};

	//  TODO: Find way to keep looping till we find a unique id
	var bcryptPromise = function bcryptPromise(password) {
	  return new Promise(function (resolve, reject) {
	    bcrypt.hash(password, 1, function (hashErr, hash) {
	      if (hashErr) {
	        reject(hashErr);
	      }
	      resolve(hash);
	    });
	  });
	};

	var doSignin = function doSignin(username, password) {

	  return new Promise(function (resolve, reject) {
	    User.findOne({ username: username }).exec(function (err, user) {
	      if (err) {
	        return reject(err);
	      }

	      if (user === undefined || user === null) {
	        return reject('user does not exist');
	      }

	      bcrypt.compare(password, user.password, function (comperr, res) {
	        if (comperr) {
	          return reject(err);
	        }

	        if (!res) {
	          return reject('bad password');
	        }
	        var returnUser = {
	          username: user.username,
	          roomId: user.roomid
	        };

	        resolve(returnUser);
	      });
	    });
	  });
	};

	var doSignup = function doSignup(username, password) {
	  console.log('signup attempt of username: ', username);

	  return new Promise(function (resolve, reject) {
	    User.find({ username: username }, function (err, users) {
	      if (err) {
	        reject('error finding username:', username);
	      }
	      if (users.length > 0) {
	        reject('user already exists');
	      } else {
	        bcrypt.hash(password, 1, function (hashErr, hash) {
	          if (hashErr) {
	            reject('can\'t generate password', hashErr);
	          }
	          generateRoomId(username).then(function (uniqueRoomId) {
	            var makeUser = new User({ username: username, password: hash, roomid: uniqueRoomId });
	            makeUser.save(function (saveErr, saveResult) {
	              if (saveErr) {
	                return reject(saveErr);
	              }
	              var returnUser = {
	                username: makeUser.username,
	                roomid: makeUser.roomid
	              };
	              return resolve(returnUser);
	            });
	          });
	        });
	      }
	    });
	  });
	};

	var signup = function signup(req, res) {
	  // signup
	  var username = req.body.username;
	  var password = req.body.password;

	  doSignup(username, password).then(function (user) {
	    var token = generateToken(username);
	    console.log('user successfully signed up', user);
	    return res.json({
	      user: user,
	      loggedIn: true,
	      token: token
	    });
	  }).catch(function (err) {
	    console.log(username, ' failed to sign up: ', err);
	    return res.json({
	      message: err,
	      loggedIn: false
	    });
	  });
	};

	var signin = function signin(req, res) {
	  // signin
	  console.log('reqbody', req.body);
	  var username = req.body.username;
	  var password = req.body.password;

	  doSignin(username, password).then(function (user) {
	    var token = generateToken(username);
	    console.log('user successfully authenticated', user);
	    return res.json({
	      user: user,
	      loggedIn: true,
	      token: token
	    });
	  }).catch(function (err) {
	    console.log('failed login because of: ', err);
	    return res.json({
	      message: err,
	      loggedIn: false
	    });
	  });
	};

	module.exports = {
	  signin: signin,
	  signup: signup,
	  doSignup: doSignup,
	  doSignin: doSignin,
	  generateRoomId: generateRoomId,
	  generateToken: generateToken
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(11);
	mongoose.connect('mongodb://localhost/soundly');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {
	  console.log('mongodb connection open');
	});

	module.exports = db;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(11);

	var UserSchema = new mongoose.Schema({
	  username: {
	    type: String,
	    unique: true,
	    required: true
	  },
	  roomid: {
	    type: String,
	    unique: true,
	    required: true
	  },
	  password: {
	    type: String,
	    required: true
	  }
	});

	module.exports = mongoose.model('User', UserSchema);

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// song-routes.js
	var db = __webpack_require__(10);
	var Song = __webpack_require__(16);

	module.exports.find = function (req, res) {
	  // getting all songs
	  Song.find({}).exec(function (err, songs) {
	    if (err) {
	      return console.error(err);
	    }

	    return res.json(songs);
	  });
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(11);

	var SongSchema = new mongoose.Schema({
	  songname: {
	    type: String,
	    unique: true,
	    required: true
	  },
	  artist: {
	    type: String,
	    required: true
	  },
	  rating: {
	    type: Number
	  },
	  duration: {
	    type: Number
	  },
	  url: {
	    type: String
	  }
	});

	module.exports = mongoose.model('Song', SongSchema);

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	// queue.js

	//
	var songQueue = [];
	// N upvotes or N downvotes will necessitate a change in
	// the ranking.  That threshold is set here.
	var rankingChangeThreshold = 2;

	// A song will look like:
	// {
	// id: req.body.id,
	// title: req.body.title,
	// duration: req.body.duration,
	// streamUrl: req.body.stream_url,
	// artwork: req.body.artwork_url,
	// upvotes: 0,
	// downvotes: 0,
	// rankingChange: 0,
	// }
	// Songs will be stored in a array, using array indexing.
	// We will store the number of likes and dislikes.  And a rankingChange which
	// tracks the number of likes or dislikes til a track is moved.
	// Song 0 is currently playing and can not be moved due to ranking changes.
	// Song 1 is next.  It will not move UP based on rankingChange, but can move down.
	// Song 2 is after Song 1, and can not swap places with Song 1 unless its rankingChange > Song 1.
	// if a rankingChange is > threshold and > than previous song, it will swap places,
	// and reduce rankingChange by the threshold.

	var swapSongs = function swapSongs(i, j) {
	  // console.log('swapping: ', i, ' with ', j);
	  var tempSong = songQueue[i];
	  songQueue[i] = songQueue[j];
	  songQueue[j] = tempSong;
	};

	// Implement algorithm described above.
	var reRankSongs = function reRankSongs(songIndexId) {
	  //  console.log('reranking: ', songIndexId);
	  var song = songQueue[songIndexId];
	  // console.log('currentrankingchange: ', song.rankingChange);
	  if (song.rankingChange >= rankingChangeThreshold) {
	    // 0 never moves, 1 never moves up.  Start the process at 2.
	    if (songIndexId >= 2) {
	      var higherSong = songQueue[songIndexId - 1];
	      // console.log('song.rankingChange: ', song.rankingChange, ' vs ', higherSong.rankingChange);
	      if (song.rankingChange > higherSong.rankingChange) {
	        song.rankingChange = song.rankingChange - rankingChangeThreshold;
	        swapSongs(songIndexId, songIndexId - 1);
	      }
	    }
	  }
	  if (song.rankingChange < 0 && Math.abs(song.rankingChange) >= rankingChangeThreshold) {
	    if (songIndexId >= 1) {
	      if (songIndexId !== songQueue.length - 1) {
	        var lowerSong = songQueue[songIndexId + 1];
	        // console.log('moving down: ', songIndexId);
	        if (song.rankingChange < lowerSong.rankingChange) {
	          song.rankingChange = song.rankingChange + rankingChangeThreshold;
	          swapSongs(songIndexId, songIndexId + 1);
	        }
	      }
	    }
	  }
	};

	var getQueue = function getQueue() {
	  return songQueue;
	};

	var emptyQueue = function emptyQueue() {
	  while (songQueue.length) {
	    songQueue.pop();
	  }
	};

	//  Remove the first/playing song.
	var removeFirstSong = function removeFirstSong(id) {
	  var p = new Promise(function (resolve, reject) {
	    if (songQueue === undefined || songQueue.length === 0) {
	      console.log('song queue is empty or undefined');
	    } else {
	      if (songQueue[0].id === id) {
	        songQueue.shift();
	      } else {
	        console.log('song already removed');
	      }
	    }
	    resolve();
	  });
	  return p;
	};

	//  Remove the first/playing song.
	var addSong = function addSong(song) {
	  // console.log('$$$$SONGfQ', song);
	  var songToAdd = {
	    title: song.title,
	    id: song.id,
	    duration: song.duration,
	    rankingChange: 0,
	    upvotes: 0,
	    downvotes: 0,
	    stream_url: song.stream_url,
	    artwork_url: song.artwork_url
	  };
	  var p = new Promise(function (resolve, reject) {
	    if (songQueue === undefined) {
	      reject('song queue is undefined');
	    }
	    if (songQueue.length > 0) {
	      if (songQueue[songQueue.length - 1].id === songToAdd.id) {
	        reject('the same song cannot be added one after another');
	      } else {
	        songQueue.push(songToAdd);
	      }
	    } else {
	      songQueue.push(songToAdd);
	    }
	    resolve();
	  });
	  return p;
	};

	var upvote = function upvote(songIndexId) {
	  var p = new Promise(function (resolve, reject) {
	    var songInQueue = songQueue[songIndexId];
	    if (songInQueue === undefined) {
	      reject('attempt to uprank song that doesn\'t exist');
	    } else {
	      songInQueue.upvotes++;
	      songInQueue.rankingChange++;
	      reRankSongs(songIndexId);
	      resolve();
	    }
	  });
	  return p;
	};

	var downvote = function downvote(songIndexId) {
	  var p = new Promise(function (resolve, reject) {
	    var songInQueue = songQueue[songIndexId];
	    if (songInQueue === undefined) {
	      reject('attempt to uprank song that doesn\'t exist');
	    } else {
	      songInQueue.downvotes++;
	      songInQueue.rankingChange--;
	      reRankSongs(songIndexId);
	      resolve();
	    }
	  });
	  return p;
	};

	var moveup = function moveup(songIndexId) {
	  var p = new Promise(function (resolve, reject) {
	    if (songIndexId < 0 || songIndexId >= songQueue.length) {
	      reject('attempt to remove song that doesn\'t exist');
	    } else if (songIndexId <= 1) {
	      reject('can\'t move song in play');
	    } else {
	      swapSongs(songIndexId, songIndexId - 1);
	      resolve();
	    }
	  });
	  return p;
	};

	var movedown = function movedown(songIndexId) {
	  var p = new Promise(function (resolve, reject) {
	    if (songIndexId < 0 || songIndexId >= songQueue.length) {
	      reject('attempt to remove song that doesn\'t exist');
	    } else if (songIndexId === songQueue.length - 1) {
	      reject('can\'t move last song down');
	    } else {
	      swapSongs(songIndexId, songIndexId + 1);
	      resolve();
	    }
	  });
	  return p;
	};

	var remove = function remove(songIndexId) {
	  var p = new Promise(function (resolve, reject) {
	    if (songIndexId < 0 || songIndexId >= songQueue.length) {
	      reject('attempt to remove song that doesn\'t exist');
	    } else {
	      songQueue.splice(songIndexId, 1);
	      resolve();
	    }
	  });
	  return p;
	};

	// Routes
	//

	var getSongQueue = function getSongQueue(req, res, next) {
	  res.status(300).json(getQueue());
	};

	var firstSongFinished = function firstSongFinished(req, res, next) {
	  var id = req.body.id;
	  removeFirstSong(id).then(function () {
	    return res.json(getQueue());
	  }).catch(function (err) {
	    console.log('Error ending song: ', err);
	    res.status(500).json(getQueue());
	  });
	};

	var addSongToQueue = function addSongToQueue(req, res, next) {
	  addSong(req.body).then(function () {
	    return res.json(getQueue());
	  }).catch(function (err) {
	    console.log('Error adding song to queue: ', err);
	    res.status(500).json(getQueue());
	  });
	};

	var increaseSongRanking = function increaseSongRanking(req, res, next) {
	  var id = +req.body.index;
	  upvote(id).then(function () {
	    return res.json(getQueue());
	  }).catch(function (err) {
	    console.log('Error upvoting song id: ', id, ' : ', err);
	    res.status(500).json(getQueue());
	  });
	};

	var decreaseSongRanking = function decreaseSongRanking(req, res, next) {
	  var id = +req.body.index;
	  downvote(id).then(function () {
	    return res.json(getQueue());
	  }).catch(function (err) {
	    console.log('Error downvoting song id: ', id, ' : ', err);
	    res.status(500).json(getQueue());
	  });
	};

	var moveUpInQueue = function moveUpInQueue(req, res, next) {
	  var id = +req.body.index;
	  moveup(id).then(function () {
	    return res.json(getQueue());
	  }).catch(function (err) {
	    console.log('Error downvoting song id: ', id, ' : ', err);
	    res.status(500).json(getQueue());
	  });
	};

	var moveDownInQueue = function moveDownInQueue(req, res, next) {
	  var id = +req.body.index;
	  movedown(id).then(function () {
	    return res.json(getQueue());
	  }).catch(function (err) {
	    console.log('Error downvoting song id: ', id, ' : ', err);
	    res.status(500).json(getQueue());
	  });
	};

	var removeSongFromQueue = function removeSongFromQueue(req, res, next) {
	  var id = +req.body.index;
	  remove(id).then(function () {
	    return res.json(getQueue());
	  }).catch(function (err) {
	    console.log('Error downvoting song id: ', id, ' : ', err);
	    res.status(500).json(getQueue());
	  });
	};

	module.exports = {
	  //  functions for tests
	  getQueue: getQueue,
	  removeFirstSong: removeFirstSong,
	  addSong: addSong,
	  upvote: upvote,
	  downvote: downvote,
	  moveup: moveup,
	  movedown: movedown,
	  remove: remove,
	  songQueue: songQueue,
	  emptyQueue: emptyQueue,
	  //  Routes
	  firstSongFinished: firstSongFinished,
	  addSongToQueue: addSongToQueue,
	  increaseSongRanking: increaseSongRanking,
	  decreaseSongRanking: decreaseSongRanking,
	  moveUpInQueue: moveUpInQueue,
	  moveDownInQueue: moveDownInQueue,
	  removeSongFromQueue: removeSongFromQueue,
	  getSongQueue: getSongQueue
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// soundcloud.js
	// require soundcloud package on server side
	var SC = __webpack_require__(19);
	var config = __webpack_require__(20);

	var headers = {
	  'access-control-allow-origin': '*',
	  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
	  'access-control-allow-headers': 'content-type, accept',
	  'access-control-max-age': 10 };

	// initialize soundcloud api
	// Seconds.
	SC.init({
	  id: config.SCId
	});

	// I set up the data inside the server for now
	// so we can check the input keyword from the client side
	// in our server url: /server
	var data = {};
	module.exports.get = function (req, res) {
	  data = req.body;
	  SC.get('/tracks', {
	    q: req.body.keyword,
	    limit: 50,
	    streamable: true
	  }, function (error, tracks) {
	    if (error) {
	      console.log(error);
	    }
	    return res.send({ statusCode: 200, status: 'OK', data: tracks });
	  });
	};

	module.exports.server = function (req, res) {
	  res.writeHead(200, headers);
	  res.end(JSON.stringify(data));
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("node-soundcloud");

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	var SCId = '0459c5ad7403b5ac30a0112b1411e68b';

	module.exports = {
	  SCId: SCId
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// socketio.js

	var queue = __webpack_require__(17);

	module.exports = function (app, express, http, io) {
	  var count = 0;
	  var master = true;

	  io.on('connection', function (socket) {
	    count++;
	    console.log(count + "users connected");

	    if (master) {
	      socket.emit('master', master);
	      master = false;
	    }

	    socket.emit('queue', [queue.songQueue, queue.songQueue[0]]);

	    socket.on('update', function (data) {
	      if (data) {
	        socket.broadcast.emit('queue', [queue.songQueue, data]);
	      } else {
	        socket.broadcast.emit('queue', [queue.songQueue]);
	      }
	    });

	    socket.on('disconnect', function () {
	      count--;
	      console.log(count + "users remained");
	    });
	  });
	};

/***/ }
/******/ ]);