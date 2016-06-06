// socketio.js

const queue = require('./queue.js');


module.exports = (app, express, http, io) => {
  let count = 0;
  let master = true;

  io.on('connection', (socket) => {
    count++;
    console.log(count + "users connected");

    if (master) {
      socket.emit('master', master);
      master = false;
    }
    socket.emit('queue', [queue.songQueue, queue.songQueue[0]]);

    socket.on('update', (data) => {
      if (data) {
        socket.broadcast.emit('queue', [queue.songQueue, data]);
      } else {
        socket.broadcast.emit('queue', [queue.songQueue]);
      }
    });

    socket.on('disconnect', () => {
      count--;
      console.log(count + "users remained");
    });
  });
};
