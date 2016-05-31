const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const users = require('./routes/users.js');
const songs = require('./routes/songs.js');
const soundcloud = require('./routes/soundcloud.js');
// What does this do?
// const methodOverride = require('method-override');

app.use(morgan('combined'));

// we need this to receive the search input data from the client side
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serving index.html on client side
// You do not need to use app.get('/'...) because it is taken care of by ReactRouter
app.use(express.static(__dirname + '/../compiled'));
app.get('/test', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../compiled/index.html'));
});

app.get('/users', users.find);

app.get('/songs', songs.find);

// when the client posts the search input, server receives and makes an api call to
// get the corresponding tracks
app.post('/server', soundcloud.get);
// when you go to localhost:4568/server you will see the data the server is holding if any.
app.get('/server', soundcloud.server);

const port = process.env.PORT || 4568;
app.set('port', port);
app.listen(app.get('port'));
console.log('Music happens on port: ', app.get('port'));

