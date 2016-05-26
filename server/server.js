var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var path = require('path');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../compiled'));
app.get('/', function(req, res) {
  res.send('Happening here.');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/../compiled/index.html');
});

// connect to mongoDB
mongoose.connect('mongodb://localhost/soundly');
mongoose.connection.once('open', function() {
  // we're connected!
  port = process.env.PORT || 4568;
  app.listen(port);
  console.log('Music happens on port: ' + port);
});

// TODO
// why does babel compile server.js
