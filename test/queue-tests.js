var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var assert = chai.assert;
chai.use(chaiAsPromised);
var should = chai.should();
var expect = chai.expect;
var queue = require('../server/routes/queue.js');
var User = require('../server/models/User.js');


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
  var roomid = '00001';

  before(function(done) {
    //  create a user with the roomid;
    User.remove({}).then(function(){
      var u = new User({username:'testqueueuser', password:'pw', roomid: roomid});
      u.save(function(err, success) {
        done(err);
      });
    });
  });

  beforeEach(function(done) {
    // runs before all tests in this block
    queue.emptyQueue(roomid).then(function() {
        done();
    });
  });

  it('should get the users queue', function(done) {
    queue.getQueue(roomid).should.be.fulfilled.then(function(queue) {
      expect(queue).to.be.a('array');
    }).should.notify(done);
  });



  it('should catch promised error when trying to remove song from empty queue', function(done) {
    queue.removeFirstSong('100', roomid)
    .then(function() {
      done('should not successfuly remove first song of an empty queue');
    })
    .catch(function(err) {
      done();
    });
  });
  it('should add 3 songs to the queue', function(done) {
    queue.addSong(song0, roomid)
    .then(() => queue.addSong(song1, roomid))
    .then(() => queue.addSong(song2, roomid))
    .then(function() {
      queue.getQueue(roomid)
      .then(function(queue) {
        expect(queue[0].id).to.equal(song0.id);
        done();
      })
      .catch(function(geterr) {
        done(geterr);
      });
    })
    .catch(function(err) {
      done(err);
    });
  });

  it('should remove song from queue', function(done) {
    queue.addSong(song0, roomid)
    .then(function() {
      queue.removeFirstSong('100', roomid)
      .then(function() {
        queue.getQueue(roomid)
        .then(function(queue) {
          expect(queue).to.be.empty;
          done();
        })
        .catch(done);
      })
      .catch(function() {
        done('error');
      });
    })
  });


});

describe('ranking songs changes order in queue', function() {
  var roomid = '00001';
  beforeEach(function(done) {
    // runs before all tests in this block
    queue.emptyQueue(roomid)
    .then(() => queue.addSong(song0, roomid))
    .then(() => queue.addSong(song1, roomid))
    .then(() => queue.addSong(song2, roomid))
    .then(() => queue.getQueue(roomid))
    .then((queue) => {
      //console.log('starting queue', queue);
      //console.log(queue.length);
      assert.strictEqual(queue.length, 3);
      done();
    })
    .catch((error) => {
      console.log('error adding songs', error);
    });



  });

  it('should move the last song to the second after 2 thumbs up', function(done) {
    queue.upvote(2, roomid)
    .then(() => queue.upvote(2, roomid))
    .then(() => queue.getQueue(roomid))
    .then((queue) => {
      //console.log('ending queue', queue);
      assert.strictEqual(queue[1].id, song2.id);
      done();
    })
    .catch(function(err) {
      console.log('err,', err);
      done(err);
    });
  });

  it('should move the second song to the third after 2 thumbs down', function(done) {
    queue.downvote(1, roomid)
    .then(() => queue.downvote(1, roomid))
    .then(() => queue.getQueue(roomid))
    .then((queue) => {
      //console.log('ending queue', queue);
      assert.strictEqual(queue[2].id, song1.id);
      done();
    })
    .catch(function(err) {
      console.log('err,', err);
      done(err);
    });
  });



});

