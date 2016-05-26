var express = require('express');
var app = express();


app.use(express.static(__dirname + '/../compiled'));
app.get('/', function(req, res) {
  res.send('Happening here.');
});

port = process.env.PORT || 4568;
app.listen(port);
console.log('Music happens on port: ' + port);

// TODO
// why does babel compile server.js