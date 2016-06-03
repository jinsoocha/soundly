const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const users = require('./routes/users.js');
const songs = require('./routes/songs.js');
const queue = require('./routes/queue.js');
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


// song queue -- will modularize //
// ********************************** //
const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
};

let songsQueue = [];

app.post('/queue', function(req, res) {
  const song = req.body;
  song.downVote = 0;
  song.upVote = 0;
  song.rankingChange = 0;
  songsQueue.push(song);
  console.log('songsQueue', songsQueue);
  return res.send({ statusCode: 200, status: 'OK', data: songsQueue });
});

app.post('/remove', function(req,res) {
  songsQueue.shift();
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
