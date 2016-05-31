const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/soundly');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongodb connection open');
});

module.exports = db;
