var express = require('express');
var app = express();
var bodyParser = require('body-parser');

port = process.env.PORT || 4568;
app.set('port', port);
app.listen(app.get('port'));
console.log('Music happens on port: ' + app.get('port'));
app.use(express.static(__dirname + '/../compiled'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


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
