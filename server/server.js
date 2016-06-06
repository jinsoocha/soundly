const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');


// serving index.html on client side
// You do not need to use app.get('/'...) because it is taken care of by ReactRouter
app.use(express.static(path.resolve(__dirname + '/../compiled')));
app.use(express.static(path.resolve(__dirname + '/../node_modules')));

app.get('/signin', (req, res) => {
  // and drop 'public' in the middle of here
  res.sendFile(path.join(__dirname, '/../compiled', 'index.html'));
});

app.get('/signup', (req, res) => {
  // and drop 'public' in the middle of here
  res.sendFile(path.join(__dirname, '/../compiled', 'index.html'));
});

require('./routes/middleware.js')(app, express);

require('./routes/routes.js')(app, express);

require('./routes/socketio.js')(app, express, http, io);

const port = process.env.PORT || 4568;

http.listen(port, () => {
  console.log('Music happening on =>', port);
});

//  to allow supertest to work.
module.exports = app;