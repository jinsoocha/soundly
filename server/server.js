var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var db = require('./db-config');
var User = require('./models/User.js');
var Song = require('./models/Song.js');

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

var port = process.env.PORT || 4568;
app.listen(port);
console.log('Music happens on port: ' + port);

var data;

app.post('/server',function(req,res) {
	data = req.body;
  return res.send({statusCode: 200, status: 'OK', data: req.body})

	// return SC.get('/tracks', {
 //  			q: example,
 //  			streamable: true
	// 		}).bind(this)
	// 		.then(function(tracks) {
	//   		console.log(tracks)
	// 		});
}); 

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


app.get('/server', function(req, res) {
	res.writeHead(200, headers);
  res.end(JSON.stringify(data));
});
