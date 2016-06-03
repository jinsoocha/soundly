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
      done();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvcXVldWUtdGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLFNBQVMsUUFBUSxNQUFSLEVBQWdCLE1BQTdCO0FBQ0EsSUFBSSxRQUFRLFFBQVEsMkJBQVIsQ0FBWjs7QUFHQSxJQUFNLFFBQVE7QUFDWixNQUFJLEtBRFE7QUFFWixTQUFPLHdCQUZLO0FBR1osWUFBVSxJQUhFO0FBSVosYUFBVyxnQkFKQztBQUtaLFdBQVM7QUFMRyxDQUFkO0FBT0EsSUFBTSxRQUFRO0FBQ1osTUFBSSxLQURRO0FBRVosU0FBTyxlQUZLO0FBR1osWUFBVSxJQUhFO0FBSVosYUFBVyxnQkFKQztBQUtaLFdBQVM7QUFMRyxDQUFkO0FBT0EsSUFBTSxRQUFRO0FBQ1osTUFBSSxLQURRO0FBRVosU0FBTyxjQUZLO0FBR1osWUFBVSxJQUhFO0FBSVosYUFBVyxnQkFKQztBQUtaLFdBQVM7QUFMRyxDQUFkOztBQVFBLFNBQVMseUNBQVQsRUFBb0QsWUFBVzs7QUFFN0QsYUFBVyxZQUFXOztBQUVwQixVQUFNLFVBQU47QUFDRCxHQUhEOztBQUtBLEtBQUcseUVBQUgsRUFBOEUsVUFBUyxJQUFULEVBQWU7QUFDM0YsVUFBTSxlQUFOLEdBQ0MsSUFERCxDQUNNLFlBQVc7QUFDZixXQUFLLDREQUFMO0FBQ0QsS0FIRCxFQUlDLEtBSkQsQ0FJTyxVQUFTLEdBQVQsRUFBYztBQUNuQjtBQUNELEtBTkQ7QUFPRCxHQVJEO0FBU0EsS0FBRyxpQ0FBSCxFQUFzQyxVQUFTLElBQVQsRUFBZTtBQUNuRCxVQUFNLE9BQU4sQ0FBYyxLQUFkLEVBQ0MsSUFERCxDQUNNLFlBQVc7QUFDZixhQUFPLFdBQVAsQ0FBbUIsTUFBTSxRQUFOLEdBQWlCLENBQWpCLEVBQW9CLEVBQXZDLEVBQTJDLE1BQU0sRUFBakQ7QUFDRCxLQUhELEVBSUMsSUFKRCxDQUlNLE1BQU0sT0FBTixDQUFjLEtBQWQsQ0FKTixFQUtDLElBTEQsQ0FLTSxNQUFNLE9BQU4sQ0FBYyxLQUFkLENBTE4sRUFNQyxJQU5ELENBTU0sWUFBVztBQUNmLGFBQU8sV0FBUCxDQUFtQixNQUFNLFFBQU4sR0FBaUIsQ0FBakIsRUFBb0IsRUFBdkMsRUFBMkMsTUFBTSxFQUFqRDtBQUNBO0FBQ0QsS0FURCxFQVVDLEtBVkQsQ0FVTyxVQUFTLEdBQVQsRUFBYztBQUNuQixXQUFLLEdBQUw7QUFDRCxLQVpEO0FBYUQsR0FkRDs7QUFnQkEsS0FBRywrQkFBSCxFQUFvQyxVQUFTLElBQVQsRUFBZTtBQUNqRCxVQUFNLE9BQU4sQ0FBYyxLQUFkLEVBQ0MsSUFERCxDQUNNLE1BQU0sZUFBTixFQUROLEVBRUMsSUFGRCxDQUVNLFlBQVc7QUFDZixhQUFPLFdBQVAsQ0FBbUIsTUFBTSxRQUFOLEdBQWlCLE1BQXBDLEVBQTRDLENBQTVDO0FBQ0E7QUFDRCxLQUxELEVBTUMsS0FORCxDQU1PLFVBQVMsR0FBVCxFQUFjO0FBQ25CO0FBQ0QsS0FSRDtBQVNELEdBVkQ7QUFjRCxDQTlDRDs7QUFtREEsU0FBUyxzQ0FBVCxFQUFpRCxZQUFXO0FBQzFELGFBQVcsWUFBVzs7QUFFcEIsVUFBTSxVQUFOOztBQUVBLFVBQU0sT0FBTixDQUFjLEtBQWQsRUFDQyxJQURELENBQ00sTUFBTSxPQUFOLENBQWMsS0FBZCxDQUROLEVBRUMsSUFGRCxDQUVNLE1BQU0sT0FBTixDQUFjLEtBQWQsQ0FGTjtBQUlELEdBUkQ7O0FBVUEsS0FBRywyREFBSCxFQUFnRSxVQUFTLElBQVQsRUFBZTtBQUM3RSxVQUFNLE1BQU4sQ0FBYSxDQUFiLEVBQ0MsSUFERCxDQUNNLE1BQU0sTUFBTixDQUFhLENBQWIsQ0FETixFQUVDLElBRkQsQ0FFTSxZQUFXO0FBQ2YsYUFBTyxXQUFQLENBQW1CLE1BQU0sUUFBTixHQUFpQixDQUFqQixFQUFvQixFQUF2QyxFQUEyQyxNQUFNLEVBQWpEO0FBQ0E7QUFDRCxLQUxELEVBTUMsS0FORCxDQU1PLFVBQVMsR0FBVCxFQUFjO0FBQ25CLFdBQUssR0FBTDtBQUNELEtBUkQ7QUFTRCxHQVZEOztBQVlBLEtBQUcsOERBQUgsRUFBbUUsVUFBUyxJQUFULEVBQWU7QUFDaEYsVUFBTSxRQUFOLENBQWUsQ0FBZixFQUNDLElBREQsQ0FDTSxNQUFNLFFBQU4sQ0FBZSxDQUFmLENBRE4sRUFFQyxJQUZELENBRU0sWUFBVztBQUNmLGFBQU8sV0FBUCxDQUFtQixNQUFNLFFBQU4sR0FBaUIsQ0FBakIsRUFBb0IsRUFBdkMsRUFBMkMsTUFBTSxFQUFqRDtBQUNBO0FBQ0QsS0FMRCxFQU1DLEtBTkQsQ0FNTyxVQUFTLEdBQVQsRUFBYztBQUNuQixXQUFLLEdBQUw7QUFDRCxLQVJEO0FBU0QsR0FWRDtBQWNELENBckNEIiwiZmlsZSI6InF1ZXVlLXRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFzc2VydCA9IHJlcXVpcmUoJ2NoYWknKS5hc3NlcnQ7XG52YXIgcXVldWUgPSByZXF1aXJlKCcuLi9zZXJ2ZXIvcm91dGVzL3F1ZXVlLmpzJyk7XG5cblxuY29uc3Qgc29uZzAgPSB7XG4gIGlkOiAnMTAwJyxcbiAgdGl0bGU6ICdubyBzbGVlcCB0aWxsIGJyb29rbHluJyxcbiAgZHVyYXRpb246ICc1MCcsXG4gIHN0cmVhbVVybDogJ3NvdW5kY2xvdWQvMTAxJyxcbiAgYXJ0d29yazogJ2h0dHA6Ly9iZWFzdGllLmNvbScsXG59O1xuY29uc3Qgc29uZzEgPSB7XG4gIGlkOiAnMTAxJyxcbiAgdGl0bGU6ICdsaWtlIGEgcHJheWVyJyxcbiAgZHVyYXRpb246ICc3MCcsXG4gIHN0cmVhbVVybDogJ3NvdW5kY2xvdWQvMTAyJyxcbiAgYXJ0d29yazogJ21hZG9ubmEuY29tJyxcbn07XG5jb25zdCBzb25nMiA9IHtcbiAgaWQ6ICcxMDInLFxuICB0aXRsZTogJ2hvdCBpbiBoZXJyZScsXG4gIGR1cmF0aW9uOiAnMzAnLFxuICBzdHJlYW1Vcmw6ICdzb3VuZGNsb3VkLzEwMycsXG4gIGFydHdvcms6ICdodHRwOi8vaG90aW5oZXJyZS5jb20nLFxufTtcblxuZGVzY3JpYmUoJ2NhbiBhZGQgYW5kIHJlbW92ZSBzb25ncyBmcm9tIHRoZSBxdWV1ZScsIGZ1bmN0aW9uKCkge1xuXG4gIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgLy8gcnVucyBiZWZvcmUgYWxsIHRlc3RzIGluIHRoaXMgYmxvY2tcbiAgICBxdWV1ZS5lbXB0eVF1ZXVlKCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgY2F0Y2ggcHJvbWlzZWQgZXJyb3Igd2hlbiB0cnlpbmcgdG8gcmVtb3ZlIHNvbmcgZnJvbSBlbXB0eSBxdWV1ZScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBxdWV1ZS5yZW1vdmVGaXJzdFNvbmcoKVxuICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgZG9uZSgnc2hvdWxkIG5vdCBzdWNjZXNzZnVseSByZW1vdmUgZmlyc3Qgc29uZyBvZiBhbiBlbXB0eSBxdWV1ZScpO1xuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBhZGQgMyBzb25ncyB0byB0aGUgcXVldWUnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgcXVldWUuYWRkU29uZyhzb25nMClcbiAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChxdWV1ZS5nZXRRdWV1ZSgpWzBdLmlkLCBzb25nMC5pZCk7XG4gICAgfSlcbiAgICAudGhlbihxdWV1ZS5hZGRTb25nKHNvbmcxKSlcbiAgICAudGhlbihxdWV1ZS5hZGRTb25nKHNvbmcyKSlcbiAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChxdWV1ZS5nZXRRdWV1ZSgpWzBdLmlkLCBzb25nMC5pZCk7XG4gICAgICBkb25lKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICBkb25lKGVycik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmVtb3ZlIHNvbmcgZnJvbSBxdWV1ZScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBxdWV1ZS5hZGRTb25nKHNvbmcwKVxuICAgIC50aGVuKHF1ZXVlLnJlbW92ZUZpcnN0U29uZygpKVxuICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHF1ZXVlLmdldFF1ZXVlKCkubGVuZ3RoLCAwKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cblxuXG59KTtcblxuXG5cblxuZGVzY3JpYmUoJ3Jhbmtpbmcgc29uZ3MgY2hhbmdlcyBvcmRlciBpbiBxdWV1ZScsIGZ1bmN0aW9uKCkge1xuICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgIC8vIHJ1bnMgYmVmb3JlIGFsbCB0ZXN0cyBpbiB0aGlzIGJsb2NrXG4gICAgcXVldWUuZW1wdHlRdWV1ZSgpO1xuXG4gICAgcXVldWUuYWRkU29uZyhzb25nMClcbiAgICAudGhlbihxdWV1ZS5hZGRTb25nKHNvbmcxKSlcbiAgICAudGhlbihxdWV1ZS5hZGRTb25nKHNvbmcyKSlcblxuICB9KTtcblxuICBpdCgnc2hvdWxkIG1vdmUgdGhlIGxhc3Qgc29uZyB0byB0aGUgc2Vjb25kIGFmdGVyIDIgdGh1bWJzIHVwJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIHF1ZXVlLnVwdm90ZSgyKVxuICAgIC50aGVuKHF1ZXVlLnVwdm90ZSgyKSlcbiAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChxdWV1ZS5nZXRRdWV1ZSgpWzFdLmlkLCBzb25nMi5pZCk7XG4gICAgICBkb25lKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICBkb25lKGVycik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgbW92ZSB0aGUgc2Vjb25kIHNvbmcgdG8gdGhlIHRoaXJkIGFmdGVyIDIgdGh1bWJzIGRvd24nLCBmdW5jdGlvbihkb25lKSB7XG4gICAgcXVldWUuZG93bnZvdGUoMSlcbiAgICAudGhlbihxdWV1ZS5kb3dudm90ZSgxKSlcbiAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChxdWV1ZS5nZXRRdWV1ZSgpWzJdLmlkLCBzb25nMS5pZCk7XG4gICAgICBkb25lKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICBkb25lKGVycik7XG4gICAgfSk7XG4gIH0pO1xuXG5cblxufSk7XG5cbiJdfQ==