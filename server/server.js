var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/../compiled'));
app.get('/', function(req, res) {
  res.send('Happening here.');
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
