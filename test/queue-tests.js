var assert = require('chai').assert;
var queue = require('../server/routes/queue.js');


const song0 = {
  id: '100',
  title: 'no sleep till brooklyn',
  duration: '50',
  streamUrl: 'soundcloud/101',
  artwork: 'http://beastie.com',
};
const song1 = {
  id: '101',
  title: 'like a prayer',
  duration: '70',
  streamUrl: 'soundcloud/102',
  artwork: 'madonna.com',
};
const song2 = {
  id: '102',
  title: 'hot in herre',
  duration: '30',
  streamUrl: 'soundcloud/103',
  artwork: 'http://hotinherre.com',
};

describe('can add and remove songs from the queue', function() {

  beforeEach(function() {
    // runs before all tests in this block
    queue.emptyQueue();
  });

  it('should catch promised error when trying to remove song from empty queue', function(done) {
    queue.removeFirstSong()
    .then(function() {
      done('should not successfuly remove first song of an empty queue');
    })
    .catch(function(err) {
      done();
    });
  });
  it('should add 3 songs to the queue', function(done) {
    queue.addSong(song0)
    .then(function() {
      assert.strictEqual(queue.getQueue()[0].id, song0.id);
    })
    .then(queue.addSong(song1))
    .then(queue.addSong(song2))
    .then(function() {
      assert.strictEqual(queue.getQueue()[0].id, song0.id);
      done();
    })
    .catch(function(err) {
      done(err);
    });
  });

  it('should remove song from queue', function(done) {
    queue.addSong(song0)
    .then(queue.removeFirstSong())
    .then(function() {
      assert.strictEqual(queue.getQueue().length, 0);
      done();
    })
    .catch(function(err) {
      done();
    });
  });



});




describe('ranking songs changes order in queue', function() {
  beforeEach(function() {
    // runs before all tests in this block
    queue.emptyQueue();

    queue.addSong(song0)
    .then(queue.addSong(song1))
    .then(queue.addSong(song2))

  });

  it('should move the last song to the second after 2 thumbs up', function(done) {
    queue.upvote(2)
    .then(queue.upvote(2))
    .then(function() {
      assert.strictEqual(queue.getQueue()[1].id, song2.id);
      done();
    })
    .catch(function(err) {
      done(err);
    });
  });

  it('should move the second song to the third after 2 thumbs down', function(done) {
    queue.downvote(1)
    .then(queue.downvote(1))
    .then(function() {
      assert.strictEqual(queue.getQueue()[2].id, song1.id);
      done();
    })
    .catch(function(err) {
      done(err);
    });
  });



});

