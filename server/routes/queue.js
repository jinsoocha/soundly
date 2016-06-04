// queue.js

//
const songQueue = [];
// N upvotes or N downvotes will necessitate a change in
// the ranking.  That threshold is set here.
const rankingChangeThreshold = 2;

// A song will look like:
// {
  // id: req.body.id,
  // title: req.body.title,
  // duration: req.body.duration,
  // streamUrl: req.body.stream_url,
  // artwork: req.body.artwork_url,
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

const swapSongs = (i, j) => {
  // console.log('swapping: ', i, ' with ', j);
  const tempSong = songQueue[i];
  songQueue[i] = songQueue[j];
  songQueue[j] = tempSong;
};

// Implement algorithm described above.
const reRankSongs = (songIndexId) => {
  //  console.log('reranking: ', songIndexId);
  const song = songQueue[songIndexId];
  // console.log('currentrankingchange: ', song.rankingChange);
  if (song.rankingChange >= rankingChangeThreshold) {
    // 0 never moves, 1 never moves up.  Start the process at 2.
    if (songIndexId >= 2) {
      const higherSong = songQueue[songIndexId - 1];
      // console.log('song.rankingChange: ', song.rankingChange, ' vs ', higherSong.rankingChange);
      if (song.rankingChange > higherSong.rankingChange) {
        song.rankingChange = song.rankingChange - rankingChangeThreshold;
        swapSongs(songIndexId, songIndexId - 1);
      }
    }
  }
  if (song.rankingChange < 0 && Math.abs(song.rankingChange) >= rankingChangeThreshold) {
    if (songIndexId !== (songQueue.length - 1)) {
      const lowerSong = songQueue[songIndexId + 1];
      // console.log('moving down: ', songIndexId);
      if (song.rankingChange < lowerSong.rankingChange) {
        song.rankingChange = song.rankingChange + rankingChangeThreshold;
        swapSongs(songIndexId, songIndexId + 1);
      }
    }
  }
};

const getQueue = () => songQueue;

const emptyQueue = () => {
  while (songQueue.length) {
    songQueue.pop();
  }
};

//  Remove the first/playing song.
const removeFirstSong = (id) => {
  const p = new Promise((resolve, reject) => {
    if (songQueue === undefined || songQueue.length === 0) {
      console.log('song queue is empty or undefined');
    } else {
      if (songQueue[0].id === id) {
        songQueue.shift();
      } else {
        console.log('song already removed');
      }
    }
    resolve();
  });
  return p;
};

//  Remove the first/playing song.
const addSong = (song) => {
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
    if (songQueue === undefined) {
      reject('song queue is undefined');
    }
    if (songQueue.length > 0) {
      if (songQueue[songQueue.length - 1].id === songToAdd.id) {
        reject('the same song cannot be added one after another');
      } else {
        songQueue.push(songToAdd);
      }
    } else {
      songQueue.push(songToAdd);
    }
    resolve();
  });
  return p;
};

const upvote = (songIndexId) => {
  const p = new Promise((resolve, reject) => {
    const songInQueue = songQueue[songIndexId];
    if (songInQueue === undefined) {
      reject('attempt to uprank song that doesn\'t exist');
    } else {
      songInQueue.upvotes++;
      songInQueue.rankingChange++;
      reRankSongs(songIndexId);
      resolve();
    }
  });
  return p;
};

const downvote = (songIndexId) => {
  const p = new Promise((resolve, reject) => {
    const songInQueue = songQueue[songIndexId];
    if (songInQueue === undefined) {
      reject('attempt to uprank song that doesn\'t exist');
    } else {
      songInQueue.downvotes++;
      songInQueue.rankingChange--;
      reRankSongs(songIndexId);
      resolve();
    }
  });
  return p;
};

const moveup = (songIndexId) => {
  const p = new Promise((resolve, reject) => {
    if (songIndexId < 0 || songIndexId >= songQueue.length) {
      reject('attempt to remove song that doesn\'t exist');
    } else if (songIndexId <= 1) {
      reject('can\'t move song in play');
    } else {
      swapSongs(songIndexId, songIndexId - 1);
      resolve();
    }
  });
  return p;
};

const movedown = (songIndexId) => {
  const p = new Promise((resolve, reject) => {
    if (songIndexId < 0 || songIndexId >= songQueue.length) {
      reject('attempt to remove song that doesn\'t exist');
    } else if (songIndexId === songQueue.length - 1) {
      reject('can\'t move last song down');
    } else {
      swapSongs(songIndexId, songIndexId + 1);
      resolve();
    }
  });
  return p;
};

const remove = (songIndexId) => {
  const p = new Promise((resolve, reject) => {
    if (songIndexId < 0 || songIndexId >= songQueue.length) {
      reject('attempt to remove song that doesn\'t exist');
    } else {
      songQueue.splice(songIndexId, 1);
      resolve();
    }
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
  removeFirstSong(id)
  .then(() => res.json(getQueue()))
  .catch((err) => {
    console.log('Error ending song: ', err);
    res.status(500).json(getQueue());
  });
};

const addSongToQueue = (req, res, next) => {
  addSong(req.body)
  .then(() => res.json(getQueue()))
  .catch((err) => {
    console.log('Error adding song to queue: ', err);
    res.status(500).json(getQueue());
  });
};

const increaseSongRanking = (req, res, next) => {
  const id = +req.body.index;
  upvote(id)
  .then(() => res.json(getQueue()))
  .catch((err) => {
    console.log('Error upvoting song id: ', id, ' : ', err);
    res.status(500).json(getQueue());
  });
};

const decreaseSongRanking = (req, res, next) => {
  const id = +req.body.index;
  downvote(id)
  .then(() => res.json(getQueue()))
  .catch((err) => {
    console.log('Error downvoting song id: ', id, ' : ', err);
    res.status(500).json(getQueue());
  });
};

const moveUpInQueue = (req, res, next) => {
  const id = +req.body.index;
  moveup(id)
  .then(() => res.json(getQueue()))
  .catch((err) => {
    console.log('Error downvoting song id: ', id, ' : ', err);
    res.status(500).json(getQueue());
  });
};

const moveDownInQueue = (req, res, next) => {
  const id = +req.body.index;
  movedown(id)
  .then(() => res.json(getQueue()))
  .catch((err) => {
    console.log('Error downvoting song id: ', id, ' : ', err);
    res.status(500).json(getQueue());
  });
};

const removeSongFromQueue = (req, res, next) => {
  const id = +req.body.index;
  remove(id)
  .then(() => res.json(getQueue()))
  .catch((err) => {
    console.log('Error downvoting song id: ', id, ' : ', err);
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
  songQueue,
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
