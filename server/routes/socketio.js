// socketio.js

// Disabled till we can better work with express.

const http = require('http').Server(app);
const io = require('socket.io')(http);


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('user message =>', msg);
  });
});

