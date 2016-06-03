// socketio.js

module.exports = (app, express, http, io) => {
  //  establish the socket io connection
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  //  listening to chat message from the client
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('user message =>', msg);
    });
  });
};
