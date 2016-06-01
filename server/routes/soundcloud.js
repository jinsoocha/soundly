const config = require('./../config');
// soundcloud.js
// require soundcloud package on server side
const SC = require('node-soundcloud');


const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
};

// initialize soundcloud api
SC.init({
  SCId: config.SCId,
  secret: config.secret,
});


// I set up the data inside the server for now
// so we can check the input keyword from the client side
// in our server url: /server
const data = {};

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
