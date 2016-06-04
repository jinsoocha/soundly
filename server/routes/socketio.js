// socketio.js

const queue = require('./queue.js');


module.exports = (app, express, http, io) => {
  var count = 0;

  io.on('connection', (socket) => {
    count++;
    console.log(count + "users connected");
    socket.emit('queue',queue.songQueue);

    socket.on('update', function(data) {
      console.log('sending queue', data)
      socket.broadcast.emit('queue',queue.songQueue);
    });
    socket.on('disconnect', function () {
      count--;
      console.log(count + "users remained");
    });
  });
};
