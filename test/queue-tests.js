const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const assert = chai.assert;
chai.use(chaiAsPromised);
const should = chai.should();
const expect = chai.expect;
const queue = require('../server/routes/queue.js');
const User = require('../server/models/User.js');


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

describe('add and remove songs from the queue', function() {
  const roomid = '00001';

  before(function(done) {
    //  create a user with the roomid;
    User.remove({}).then(function(){
      var u = new User({username:'testqueueuser', password:'pw', roomid: roomid});
      u.save((err, success) => done(err));
    });
  });

  beforeEach(function(done) {
    // Empty the queue
    queue.emptyQueue(roomid).then(() => done());
  });

  it('get the users queue', function(done) {
    queue.getQueue(roomid).should.be.fulfilled.then(function(queue) {
      expect(queue).to.be.a('array');
    }).should.notify(done);
  });

  it('catch promised error when trying to remove song from empty queue', function(done) {
    queue.removeFirstSong('100', roomid).should.be.rejected.and.notify(done);
  });

  it('add 3 songs to the queue', function(done) {
    queue.addSong(song0, roomid)
    .then(() => queue.addSong(song1, roomid))
    .then(() => queue.addSong(song2, roomid))
    .then(() => queue.getQueue(roomid))
    .then(function(updated) {
      expect(updated[0].id).to.equal(song0.id);
      done();
    })
    .catch(done);
  });

  it('remove song from queue', function(done) {
    queue.addSong(song0, roomid)
    .then(() => queue.removeFirstSong('100', roomid))
    .then(() => queue.getQueue(roomid))
    .then((updated) => {
      expect(updated).to.be.empty;
      done();
    })
    .catch(done);
  });

});

describe('song rankings change order in queue', function() {
  const roomid = '00001';
  beforeEach(function(done) {
    // runs before all tests in this block
    queue.emptyQueue(roomid)
    .then(() => queue.addSong(song0, roomid))
    .then(() => queue.addSong(song1, roomid))
    .then(() => queue.addSong(song2, roomid))
    .then(() => queue.getQueue(roomid))
    .then((updated) => {
      assert.strictEqual(updated.length, 3);
      done();
    })
    .catch(done);
  });

  it('should move the last song to the second after 2 thumbs up', function(done) {
    queue.upvote(2, roomid)
    .then(() => queue.upvote(2, roomid))
    .then(() => queue.getQueue(roomid))
    .then((updated) => {
      assert.strictEqual(updated[1].id, song2.id);
      done();
    })
    .catch(done);
  });

  it('should move the second song to the third after 2 thumbs down', function(done) {
    queue.downvote(1, roomid)
    .then(() => queue.downvote(1, roomid))
    .then(() => queue.getQueue(roomid))
    .then((updated) => {
      assert.strictEqual(updated[2].id, song1.id);
      done();
    })
    .catch(done);
  });
});

