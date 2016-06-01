const config = require('./../config');
// soundcloud.js
// require soundcloud package on server side
const SC = require('node-soundcloud');
const config = require('../config/config.js');

const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
};

// initialize soundcloud api
SC.init({
<<<<<<< HEAD
  SCId: config.SCId,
  secret: config.secret,
=======
  id: config.SCId
>>>>>>> 618b6d69c8b5bf37164ea6d65e461c1f348402c6
});


// I set up the data inside the server for now
// so we can check the input keyword from the client side
// in our server url: /server
let data = {};

module.exports.get = (req, res) => {
  data = req.body;
  console.log(req.body.keyword);
  SC.get('/tracks', {
    q: req.body.keyword,
    limit: 50,
    streamable: true,
  }, (error, tracks) => {
    if (error) {
      console.log(error);
    }
    return res.send({ statusCode: 200, status: 'OK', data: tracks });
  });
};

module.exports.server = (req, res) => {
  res.writeHead(200, headers);
  res.end(JSON.stringify(data));
};
