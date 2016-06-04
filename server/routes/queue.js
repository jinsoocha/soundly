// queue.js
const User = require('../models/User.js');
const db = require('../db-config');
// N upvotes or N downvotes will necessitate a change in
// the ranking.  That threshold is set here.
const rankingChangeThreshold = 2;

// A song will look like:
// {
  // id: req.body.id,
  // title: req.body.title,
  // duration: req.body.duration,
  // stream_url: req.body.stream_url,
  // artwork_url: req.body.artwork_url,
  // upvotes: 0,
  // downvotes: 0,
  // rankingChange: 0,
// }
// Songs will be stored in a array, using array indexing.
// We will store the number of likes and dislikes.  And a rankingChange which
// tracks the number of likes or dislikes til a track is moved.
// Song 0 is currently playing and can not be moved due to ranking changes.
// Song 1 is next.  It will not move UP based on rankingChange, but can move down.
// Song 2 is after Song 1, and can not swap places with Song 1 unless its rankingChange > Song 1.
// if a rankingChange is > threshold and > than previous song, it will swap places,
// and reduce rankingChange by the threshold.

const swapSongs = (i, j, songQueue) => {
  // console.log('swapping: ', i, ' with ', j);
  const tempSong = songQueue[i];
  songQueue[i] = songQueue[j];
  songQueue[j] = tempSong;
};

// Implement algorithm described above.
const reRankSongs = (songIndexId, songQueue) => {
  const song = songQueue[songIndexId];
  // console.log('currentrankingchange: ', song.rankingChange);
  if (song.rankingChange >= rankingChangeThreshold) {
    // 0 never moves, 1 never moves up.  Start the process at 2.
    if (songIndexId >= 2) {
      const higherSong = songQueue[songIndexId - 1];
      //  console.log('song.rankingChange: ', song.rankingChange, ' vs ', higherSong.rankingChange);
      if (song.rankingChange > higherSong.rankingChange) {
        song.rankingChange = song.rankingChange - rankingChangeThreshold;
        swapSongs(songIndexId, songIndexId - 1, songQueue);
      }
    }
  }
  if (song.rankingChange < 0 && Math.abs(song.rankingChange) >= rankingChangeThreshold) {
    if (songIndexId !== (songQueue.length - 1)) {
      const lowerSong = songQueue[songIndexId + 1];
      // console.log('moving down: ', songIndexId);
      if (song.rankingChange < lowerSong.rankingChange) {
        song.rankingChange = song.rankingChange + rankingChangeThreshold;
        swapSongs(songIndexId, songIndexId + 1, songQueue);
      }
    }
  }
  // return songQueue.splice(0);
  return songQueue;
};

const getQueue = (roomid) => {
  return new Promise((resolve, reject) => {
    User.findOne({ roomid: roomid })
    .then((found) => {
      resolve(found.queue);
    })
    .catch(reject);
  });
};

const emptyQueue = (roomid) => {
  return new Promise((resolve, reject) => {
    User.findOne({ roomid: roomid }).exec()
    .then((user) => {
      if (user.queue === undefined) {
        reject('song queue is empty or undefined');
      }

      user.queue = [];
      user.save()
      .then(resolve)
      .catch(reject);
    })
    .catch(reject);
  });
};

//  Remove the first/playing song.
const removeFirstSong = (id, roomid) => {
  const p = new Promise((resolve, reject) => {
    User.findOne({ roomid: roomid }).exec()
    .then((user) => {
      if (user.queue === undefined || user.queue.length === 0) {
        reject('song queue is empty or undefined');
      }
      if (user.queue[0].id === id) {
        user.queue.shift();
        user.save()
        .then(resolve)
        .catch(reject);
      } else {
        console.log('song already removed');
        resolve();
      }
    })
    .catch(reject);
  });
  return p;
};

//  Remove the first/playing song.
const addSong = (song, roomid) => {
  // console.log('$$$$SONGfQ', song);
  const songToAdd = {
    title: song.title,
    id: song.id,
    duration: song.duration,
    rankingChange: 0,
    upvotes: 0,
    downvotes: 0,
    stream_url: song.stream_url,
    artwork_url: song.artwork_url,
  };
  const p = new Promise((resolve, reject) => {
    User.findOne({ roomid: roomid }).exec()
    .then((user) => {
      if (user.queue === undefined) {
        reject('song queue is undefined');
      }
      user.queue.push(songToAdd);

      if (user.queue.length > 0) {
        if (user.queue[user.queue.length - 1].id === songToAdd.id) {
          reject('the same song cannot be added one after another');
        } else {
          user.queue.push(songToAdd);
        }
      } else {
        user.queue.push(songToAdd);
      }
      user.save()
      .then(resolve)
      .catch(reject);
    })
    .catch(reject);
  });
  return p;
};

const upvote = (songIndexId, roomid) => {
  const p = new Promise((resolve, reject) => {
    User.findOne({ roomid: roomid }).exec()
    .then((user) => {
      if (user.queue[songIndexId] === undefined) {
        console.log('songindexid:', songIndexId, 'user.queue', user.queue);
        reject('attempt to uprank song that doesn\'t exist');
      } else {
        user.queue[songIndexId].upvotes++;
        user.queue[songIndexId].rankingChange++;
        user.queue = reRankSongs(songIndexId, user.queue);
        // necessary for marking array change
        user.markModified('queue');
        user.save().then(resolve).catch(reject);
      }
    })
    .catch(reject);
  });
  return p;
};

const downvote = (songIndexId, roomid) => {
  const p = new Promise((resolve, reject) => {
<<<<<<< HEAD
    User.findOne({ roomid: roomid }).exec()
    .then((user) => {
      if (user.queue[songIndexId] === undefined) {
        reject('attempt to uprank song that doesn\'t exist');
      } else {
        user.queue[songIndexId].downvotes++;
        user.queue[songIndexId].rankingChange--;
        user.queue = reRankSongs(songIndexId, user.queue);
        // necessary for marking array change
        user.markModified('queue');
        user.save().then(resolve).catch(reject);
      }
    })
    .catch(reject);
=======
    const songInQueue = songQueue[songIndexId];
    if (songInQueue === undefined) {
      reject('attempt to uprank song that doesn\'t exist');
    } else {
      songInQueue.downvotes++;
      songInQueue.rankingChange--;
      reRankSongs(songIndexId);
      resolve();
    }
>>>>>>> 97636f6ec6be79bc52908476276cdb56b1ca69fb
  });
  return p;
};

const moveup = (songIndexId, roomid) => {
  const p = new Promise((resolve, reject) => {
    User.findOne({ roomid: roomid }).exec()
    .then((user) => {
      if (songIndexId < 0 || songIndexId >= user.queue.length) {
        reject('attempt to move song that doesn\'t exist');
      } else if (songIndexId <= 1) {
        reject('can\'t move song in play');
      } else {
        user.queue = swapSongs(songIndexId, songIndexId - 1, user.queue);
        user.save().then(resolve).catch(reject);
      }
    })
    .catch(reject);
  });
  return p;
};

const movedown = (songIndexId, roomid) => {
  const p = new Promise((resolve, reject) => {
    User.findOne({ roomid: roomid }).exec()
    .then((user) => {
      if (songIndexId < 0 || songIndexId >= user.queue.length) {
        reject('attempt to move song that doesn\'t exist');
      } else if (songIndexId <= 1) {
        reject('can\'t move song in play');
      } else if (songIndexId === user.queue.length - 1) {
        reject('can\'t move last song down');
      } else {
        user.queue = swapSongs(songIndexId, songIndexId + 1, user.queue);
        user.save().then(resolve).catch(reject);
      }
    })
    .catch(reject);
  });
  return p;
};

const remove = (songIndexId, roomid) => {
  const p = new Promise((resolve, reject) => {
    User.findOne({ roomid: roomid }).exec()
    .then((user) => {
      if (songIndexId < 0 || songIndexId >= user.queue.length) {
        reject('attempt to move song that doesn\'t exist');
      } else {
        user.queue.splice(songIndexId, 1);
        user.save().then(resolve).catch(reject);
      }
    })
    .catch(reject);
  });
  return p;
};


// Routes
//

const getSongQueue = (req, res, next) => {
  res.status(300).json(getQueue());
};

const firstSongFinished = (req, res, next) => {
  const id = req.body.id;

  removeFirstSong(id, req.roomid)
  .then(() => {
    getQueue(req.roomid).then((queue) => res.json(queue));
  }).catch((err) => {
    console.log('Error ending song: ', err);
    res.status(500).json(getQueue());
  });
};

const addSongToQueue = (req, res, next) => {
  addSong(req.body, req.roomid)
  .then(() => {
    getQueue(req.roomid).then((queue) => res.json(queue));
  }).catch((err) => {
    console.log('Error adding song to queue: ', err);
    res.status(500).json(getQueue());
  });
};

const increaseSongRanking = (req, res, next) => {
  const idx = +req.body.index;

  upvote(idx, req.roomid)
  .then(() => {
    getQueue(req.roomid).then((queue) => res.json(queue));
  }).catch((err) => {
    console.log('Error upvoting song idx: ', idx, ' : ', err);
    res.status(500).json(getQueue());
  });
};

const decreaseSongRanking = (req, res, next) => {
  const idx = +req.body.index;
  downvote(idx, req.roomid)
  .then(() => {
    getQueue(req.roomid).then((queue) => res.json(queue));
  }).catch((err) => {
    console.log('Error downvoting song idx: ', idx, ' : ', err);
    res.status(500).json(getQueue());
  });
};

const moveUpInQueue = (req, res, next) => {
  const idx = +req.body.index;
  moveup(idx, req.roomid)
  .then(() => {
    getQueue(req.roomid).then((queue) => res.json(queue));
  }).catch((err) => {
    console.log('Error downvoting song idx: ', idx, ' : ', err);
    res.status(500).json(getQueue());
  });
};

const moveDownInQueue = (req, res, next) => {
  const idx = +req.body.index;
  movedown(idx, req.roomid)
  .then(() => {
    getQueue(req.roomid).then((queue) => res.json(queue));
  }).catch((err) => {
    console.log('Error downvoting song idx: ', idx, ' : ', err);
    res.status(500).json(getQueue());
  });
};

const removeSongFromQueue = (req, res, next) => {
  const idx = +req.body.index;
  remove(idx, req.roomid)
  .then(() => {
    getQueue(req.roomid).then((queue) => res.json(queue));
  }).catch((err) => {
    console.log('Error downvoting song idx: ', idx, ' : ', err);
    res.status(500).json(getQueue());
  });
};

module.exports = {
  //  functions for tests
  getQueue,
  removeFirstSong,
  addSong,
  upvote,
  downvote,
  moveup,
  movedown,
  remove,
  emptyQueue,
  //  Routes
  firstSongFinished,
  addSongToQueue,
  increaseSongRanking,
  decreaseSongRanking,
  moveUpInQueue,
  moveDownInQueue,
  removeSongFromQueue,
  getSongQueue,
};
