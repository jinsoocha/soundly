// socketio.js

const queue = require('./queue.js');


module.exports = (app, express, http, io) => {
  // //  establish the socket io connection
  // io.on('connection', (socket) => {
  //   console.log('a user connected');
  //   socket.on('disconnect', () => {
  //     console.log('user disconnected');
  //   });
  // });

  //  listening to chat message from the client
  var count = 0;

  io.on('connection', (socket) => {
    count++;
    console.log(count + "users connected");
    socket.emit('queue',queue.songQueue);

    socket.on('disconnect', function () {
      count--;
      console.log(count + "users remained");
    });
  });
};
