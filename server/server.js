const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const users = require('./routes/users.js');
const songs = require('./routes/songs.js');
const soundcloud = require('./routes/soundcloud.js');
// //attach http server to the express app
const http = require('http').Server(app);
// //attach socket io to http server
const io = require('socket.io')(http);
app.use(morgan('dev'));

// we need this to receive the search input data from the client side
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serving index.html on client side
// You do not need to use app.get('/'...) because it is taken care of by ReactRouter
app.use(express.static(__dirname + '/../compiled'));

app.get('/users', users.find);

app.get('/songs', songs.find);
// when the client posts the search input, server receives and makes an api call to
// get the corresponding tracks
app.post('/server', soundcloud.get);
// when you go to localhost:4568/server you will see the data the server is holding if any.
app.get('/server', soundcloud.server);

// song queue -- will modularize //
// ********************************** //
const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
};
const songsQueue = [];
app.post('/queue', function(req, res) {
  const song = req.body;
  song.downVote = 0;
  song.upVote = 0;
  song.rankingChange = 0;
  songsQueue.push(song);
  console.log('songsQueue', songsQueue);
  return res.send({ statusCode: 200, status: 'OK', data: songsQueue });
});

app.get('/queue', function(req, res) {
  res.writeHead(200, headers);
  res.end(JSON.stringify(songsQueue));
});
// ********************************** //

const port = process.env.PORT || 4568;

//  establish the socket io connection
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

//  listening to chat message from the client
io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    console.log('user message =>', msg);
  });
});

http.listen(port, function() {
  console.log('Music happening on =>', port);
});
