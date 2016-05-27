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

var SC = require('node-soundcloud');
 
// Initialize client 
SC.init({
  id: '0459c5ad7403b5ac30a0112b1411e68b',
  secret: 'ca7a19a59c37ed373dbcbeb71d6d8a74',
});

var data;

app.post('/server',function(req,res) {
	data = req.body;
	console.log(req.body.keyword)
	SC.get('/tracks', {
  			q: req.body.keyword,
  			streamable: true
			},function(error, tracks) {
  			return res.send({statusCode: 200, status: 'OK', data: tracks})
			});
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
