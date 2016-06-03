//  routes.js
const users = require('./users.js');
const songs = require('./songs.js');
const queue = require('./queue.js');
const soundcloud = require('./soundcloud.js');

module.exports = (app, express) => {
  //  Users
  app.get('/users', users.find);

  app.get('/songs', songs.find);
  // when the client posts the search input, server receives and makes an api call to
  // get the corresponding tracks
  app.post('/server', soundcloud.get);
  // when you go to localhost:4568/server you will see the data the server is holding if any.
  app.get('/server', soundcloud.server);

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
};
