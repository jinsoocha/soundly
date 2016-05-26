var express = require('express');
var app = express();

port = process.env.PORT || 4568;
app.set('port', port);
app.listen(app.get('port'));
console.log('Music happens on port: ' + app.get('port'));
app.use(express.static(__dirname + '/../compiled'));

