var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var path = require('path');
var db = require('./db-config');
var User = require('./models/User.js');
var Song = require('./models/Song.js');
var port = process.env.PORT || 4568;
// app.listen(port);

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../compiled'));

app.get('/users', function(req, res) {
  // getting all users
  User.find({})
    .exec(function(err, users) {
      if (err) {
        return console.error(err);
      } else {
        res.json(users);
      }
    })
});

app.get('/songs', function(req, res) {
  // getting all songs
  Song.find({})
    .exec(function(err, songs) {
      if (err) {
        return console.error(err);
      } else {
        res.json(songs);
      }
    })
});

app.get('/test', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../compiled/index.html'));
});

io.on('connection', function(socket) {
  console.log('= a user connected =');
})

http.listen(port, function() {
  console.log('Music happening on =>', port);
});
