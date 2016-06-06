// socketio.js

const queue = require('./queue.js');


module.exports = (app, express, http, io) => {
  let count = 0;
  let master = true;

  io.on('connection', (socket) => {
    count++;
    console.log(count, 'users connected');

    if (master) {
      socket.emit('master', master);
      master = false;
    }
    queue.getQueue('00000').then((updated) => {
      if (updated.length > 0) {
        socket.emit('queue', [updated, updated[0]]);
      } else {
        socket.emit('queue', [updated]);
      }
    });

    socket.on('update', (data) => {
      queue.getQueue('00000').then((updated) => {
        if (data) {
          socket.broadcast.emit('queue', [updated, data]);
        } else {
          socket.broadcast.emit('queue', [updated]);
        }
      });
    });

    socket.on('disconnect', () => {
      count--;
      console.log(count, 'users remained');
    });
  });
};
