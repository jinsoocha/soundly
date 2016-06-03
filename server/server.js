const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


// serving index.html on client side
// You do not need to use app.get('/'...) because it is taken care of by ReactRouter
app.use(express.static(__dirname + '/../compiled'));

require('./routes/middleware.js')(app, express);

<<<<<<< HEAD
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




// ********************************** //
require('./routes/routes.js')(app, express);
require('./routes/socketio.js')(app, express, http, io);


const port = process.env.PORT || 4568;

http.listen(port, () => {
  console.log('Music happening on =>', port);
});
