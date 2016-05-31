// song-routes.js
const db = require('../db-config');
const Song = require('../models/Song.js');

module.exports.find = (req, res) => {
  // getting all songs
  Song.find({})
    .exec((err, songs) => {
      if (err) {
        return console.error(err);
      }

      return res.json(songs);
    });
};
