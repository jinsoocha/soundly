'use strict';

var assert = require('chai').assert;
var queue = require('../server/routes/queue.js');

var song0 = {
  id: '100',
  title: 'no sleep till brooklyn',
  duration: '50',
  streamUrl: 'soundcloud/101',
  artwork: 'http://beastie.com'
};
var song1 = {
  id: '101',
  title: 'like a prayer',
  duration: '70',
  streamUrl: 'soundcloud/102',
  artwork: 'madonna.com'
};
var song2 = {
  id: '102',
  title: 'hot in herre',
  duration: '30',
  streamUrl: 'soundcloud/103',
  artwork: 'http://hotinherre.com'
};

describe('can add and remove songs from the queue', function () {

  beforeEach(function () {
    // runs before all tests in this block
    queue.emptyQueue();
  });

  it('should catch promised error when trying to remove song from empty queue', function (done) {
    queue.removeFirstSong().then(function () {
      done('should not successfuly remove first song of an empty queue');
    }).catch(function (err) {
      done();
    });
  });
  it('should add 3 songs to the queue', function (done) {
    queue.addSong(song0).then(function () {
      assert.strictEqual(queue.getQueue()[0].id, song0.id);
    }).then(queue.addSong(song1)).then(queue.addSong(song2)).then(function () {
      assert.strictEqual(queue.getQueue()[0].id, song0.id);
      done();
    }).catch(function (err) {
      done(err);
    });
  });

  it('should remove song from queue', function (done) {
    queue.addSong(song0).then(queue.removeFirstSong()).then(function () {
      assert.strictEqual(queue.getQueue().length, 0);
      done();
    }).catch(function (err) {
      done('received error from remove song');
    });
  });
});

describe('ranking songs changes order in queue', function () {
  beforeEach(function () {
    // runs before all tests in this block
    queue.emptyQueue();

    queue.addSong(song0).then(queue.addSong(song1)).then(queue.addSong(song2));
  });

  it('should move the last song to the second after 2 thumbs up', function (done) {
    queue.upvote(2).then(queue.upvote(2)).then(function () {
      assert.strictEqual(queue.getQueue()[1].id, song2.id);
      done();
    }).catch(function (err) {
      done(err);
    });
  });

  it('should move the second song to the third after 2 thumbs down', function (done) {
    queue.downvote(1).then(queue.downvote(1)).then(function () {
      assert.strictEqual(queue.getQueue()[2].id, song1.id);
      done();
    }).catch(function (err) {
      done(err);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,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O0FBWUEsS0FBRyw4REFBSCxFQUFtRSxVQUFTLElBQVQsRUFBZTtBQUNoRixVQUFNLFFBQU4sQ0FBZSxDQUFmLEVBQ0MsSUFERCxDQUNNLE1BQU0sUUFBTixDQUFlLENBQWYsQ0FETixFQUVDLElBRkQsQ0FFTSxZQUFXO0FBQ2YsYUFBTyxXQUFQLENBQW1CLE1BQU0sUUFBTixHQUFpQixDQUFqQixFQUFvQixFQUF2QyxFQUEyQyxNQUFNLEVBQWpEO0FBQ0E7QUFDRCxLQUxELEVBTUMsS0FORCxDQU1PLFVBQVMsR0FBVCxFQUFjO0FBQ25CLFdBQUssR0FBTDtBQUNELEtBUkQ7QUFTRCxHQVZEO0FBY0QsQ0FyQ0QiLCJmaWxlIjoicXVldWUtdGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXNzZXJ0ID0gcmVxdWlyZSgnY2hhaScpLmFzc2VydDtcbnZhciBxdWV1ZSA9IHJlcXVpcmUoJy4uL3NlcnZlci9yb3V0ZXMvcXVldWUuanMnKTtcblxuXG5jb25zdCBzb25nMCA9IHtcbiAgaWQ6ICcxMDAnLFxuICB0aXRsZTogJ25vIHNsZWVwIHRpbGwgYnJvb2tseW4nLFxuICBkdXJhdGlvbjogJzUwJyxcbiAgc3RyZWFtVXJsOiAnc291bmRjbG91ZC8xMDEnLFxuICBhcnR3b3JrOiAnaHR0cDovL2JlYXN0aWUuY29tJyxcbn07XG5jb25zdCBzb25nMSA9IHtcbiAgaWQ6ICcxMDEnLFxuICB0aXRsZTogJ2xpa2UgYSBwcmF5ZXInLFxuICBkdXJhdGlvbjogJzcwJyxcbiAgc3RyZWFtVXJsOiAnc291bmRjbG91ZC8xMDInLFxuICBhcnR3b3JrOiAnbWFkb25uYS5jb20nLFxufTtcbmNvbnN0IHNvbmcyID0ge1xuICBpZDogJzEwMicsXG4gIHRpdGxlOiAnaG90IGluIGhlcnJlJyxcbiAgZHVyYXRpb246ICczMCcsXG4gIHN0cmVhbVVybDogJ3NvdW5kY2xvdWQvMTAzJyxcbiAgYXJ0d29yazogJ2h0dHA6Ly9ob3RpbmhlcnJlLmNvbScsXG59O1xuXG5kZXNjcmliZSgnY2FuIGFkZCBhbmQgcmVtb3ZlIHNvbmdzIGZyb20gdGhlIHF1ZXVlJywgZnVuY3Rpb24oKSB7XG5cbiAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAvLyBydW5zIGJlZm9yZSBhbGwgdGVzdHMgaW4gdGhpcyBibG9ja1xuICAgIHF1ZXVlLmVtcHR5UXVldWUoKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBjYXRjaCBwcm9taXNlZCBlcnJvciB3aGVuIHRyeWluZyB0byByZW1vdmUgc29uZyBmcm9tIGVtcHR5IHF1ZXVlJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIHF1ZXVlLnJlbW92ZUZpcnN0U29uZygpXG4gICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICBkb25lKCdzaG91bGQgbm90IHN1Y2Nlc3NmdWx5IHJlbW92ZSBmaXJzdCBzb25nIG9mIGFuIGVtcHR5IHF1ZXVlJyk7XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGFkZCAzIHNvbmdzIHRvIHRoZSBxdWV1ZScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBxdWV1ZS5hZGRTb25nKHNvbmcwKVxuICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHF1ZXVlLmdldFF1ZXVlKClbMF0uaWQsIHNvbmcwLmlkKTtcbiAgICB9KVxuICAgIC50aGVuKHF1ZXVlLmFkZFNvbmcoc29uZzEpKVxuICAgIC50aGVuKHF1ZXVlLmFkZFNvbmcoc29uZzIpKVxuICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHF1ZXVlLmdldFF1ZXVlKClbMF0uaWQsIHNvbmcwLmlkKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgIGRvbmUoZXJyKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZW1vdmUgc29uZyBmcm9tIHF1ZXVlJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIHF1ZXVlLmFkZFNvbmcoc29uZzApXG4gICAgLnRoZW4ocXVldWUucmVtb3ZlRmlyc3RTb25nKCkpXG4gICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocXVldWUuZ2V0UXVldWUoKS5sZW5ndGgsIDApO1xuICAgICAgZG9uZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgZG9uZSgncmVjZWl2ZWQgZXJyb3IgZnJvbSByZW1vdmUgc29uZycpO1xuICAgIH0pO1xuICB9KTtcblxuXG59KTtcblxuZGVzY3JpYmUoJ3Jhbmtpbmcgc29uZ3MgY2hhbmdlcyBvcmRlciBpbiBxdWV1ZScsIGZ1bmN0aW9uKCkge1xuICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgIC8vIHJ1bnMgYmVmb3JlIGFsbCB0ZXN0cyBpbiB0aGlzIGJsb2NrXG4gICAgcXVldWUuZW1wdHlRdWV1ZSgpO1xuXG4gICAgcXVldWUuYWRkU29uZyhzb25nMClcbiAgICAudGhlbihxdWV1ZS5hZGRTb25nKHNvbmcxKSlcbiAgICAudGhlbihxdWV1ZS5hZGRTb25nKHNvbmcyKSlcblxuICB9KTtcblxuICBpdCgnc2hvdWxkIG1vdmUgdGhlIGxhc3Qgc29uZyB0byB0aGUgc2Vjb25kIGFmdGVyIDIgdGh1bWJzIHVwJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIHF1ZXVlLnVwdm90ZSgyKVxuICAgIC50aGVuKHF1ZXVlLnVwdm90ZSgyKSlcbiAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChxdWV1ZS5nZXRRdWV1ZSgpWzFdLmlkLCBzb25nMi5pZCk7XG4gICAgICBkb25lKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICBkb25lKGVycik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgbW92ZSB0aGUgc2Vjb25kIHNvbmcgdG8gdGhlIHRoaXJkIGFmdGVyIDIgdGh1bWJzIGRvd24nLCBmdW5jdGlvbihkb25lKSB7XG4gICAgcXVldWUuZG93bnZvdGUoMSlcbiAgICAudGhlbihxdWV1ZS5kb3dudm90ZSgxKSlcbiAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChxdWV1ZS5nZXRRdWV1ZSgpWzJdLmlkLCBzb25nMS5pZCk7XG4gICAgICBkb25lKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICBkb25lKGVycik7XG4gICAgfSk7XG4gIH0pO1xuXG5cblxufSk7XG5cbiJdfQ==