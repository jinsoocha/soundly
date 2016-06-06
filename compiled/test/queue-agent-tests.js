'use strict';

// queue-agent-tests.js
var request = require('supertest');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var assert = chai.assert;
var expect = chai.expect;

//  Get the server.  Works even if not running
var app = require('../server/server.js');

// just a simple test to make sure that super test works.
describe('GET /songs', function () {
  it('respond with json', function (done) {
    request(app).get('/songs').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
  });
});

describe('GET /queue returns with a admin queue', function () {
  it('get queue successfully', function (done) {
    request(app).get('/api/queue/getQueue').set('Accept', 'application/json')
    // .expect('Content-Type', /json/)
    // .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      done();
    });
  });

  it('post queue successfully', function (done) {
    var song0 = {
      id: '100',
      title: 'no sleep till brooklyn',
      duration: '50',
      stream_url: 'soundcloud/101',
      artwork_url: 'http://beastie.com'
    };
    request(app).post('/api/queue/addSong').send(song0).expect(200)
    //.expect("marcus is stored", done);
    .end(function (err, res) {
      if (err) return done(err);
      //console.log('res from post:', res.body);
      expect(res.body[0].id).to.equal(song0.id);
      done();
    });
  });
  it('thumbs up successful', function (done) {
    var song1 = {
      id: '101',
      title: 'like a prayer',
      duration: '70',
      stream_url: 'soundcloud/102',
      artwork_url: 'madonna.com'
    };
    request(app).post('/api/queue/addSong').send(song1).expect(200).end(function (err, res) {
      request(app).post('/api/queue/increaseRank').send({ 'index': '0' }).expect(200)
      //.expect("marcus is stored", done);
      .end(function (err, res) {
        expect(res.body[0].upvotes).to.equal(1);
        //console.log('res from thumbs up', res.body);
        done();
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvcXVldWUtYWdlbnQtdGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsSUFBSSxVQUFVLFFBQVEsV0FBUixDQUFkO0FBQ0EsSUFBTSxPQUFPLFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTSxpQkFBaUIsUUFBUSxrQkFBUixDQUF2QjtBQUNBLElBQU0sU0FBUyxLQUFLLE1BQXBCO0FBQ0EsSUFBTSxTQUFTLEtBQUssTUFBcEI7OztBQUdBLElBQUksTUFBTSxRQUFRLHFCQUFSLENBQVY7OztBQUlBLFNBQVMsWUFBVCxFQUF1QixZQUFXO0FBQ2hDLEtBQUcsbUJBQUgsRUFBd0IsVUFBUyxJQUFULEVBQWU7QUFDckMsWUFBUSxHQUFSLEVBQ0csR0FESCxDQUNPLFFBRFAsRUFFRyxHQUZILENBRU8sUUFGUCxFQUVpQixrQkFGakIsRUFHRyxNQUhILENBR1UsY0FIVixFQUcwQixNQUgxQixFQUlHLE1BSkgsQ0FJVSxHQUpWLEVBSWUsSUFKZjtBQUtELEdBTkQ7QUFPRCxDQVJEOztBQVVBLFNBQVMsdUNBQVQsRUFBa0QsWUFBVztBQUMzRCxLQUFHLHdCQUFILEVBQTZCLFVBQVMsSUFBVCxFQUFlO0FBQzFDLFlBQVEsR0FBUixFQUNHLEdBREgsQ0FDTyxxQkFEUCxFQUVHLEdBRkgsQ0FFTyxRQUZQLEVBRWlCLGtCQUZqQjs7O0FBQUEsS0FLRyxHQUxILENBS08sVUFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQjtBQUN0QixVQUFJLEdBQUosRUFBUyxPQUFPLEtBQUssR0FBTCxDQUFQO0FBQ1Q7QUFDRCxLQVJIO0FBU0QsR0FWRDs7QUFZQSxLQUFHLHlCQUFILEVBQThCLFVBQVMsSUFBVCxFQUFlO0FBQzNDLFFBQU0sUUFBUTtBQUNaLFVBQUksS0FEUTtBQUVaLGFBQU8sd0JBRks7QUFHWixnQkFBVSxJQUhFO0FBSVosa0JBQVksZ0JBSkE7QUFLWixtQkFBYTtBQUxELEtBQWQ7QUFPQSxZQUFRLEdBQVIsRUFDRyxJQURILENBQ1Esb0JBRFIsRUFFRyxJQUZILENBRVEsS0FGUixFQUdHLE1BSEgsQ0FHVSxHQUhWOztBQUFBLEtBS0csR0FMSCxDQUtPLFVBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUI7QUFDdEIsVUFBSSxHQUFKLEVBQVMsT0FBTyxLQUFLLEdBQUwsQ0FBUDs7QUFFVCxhQUFPLElBQUksSUFBSixDQUFTLENBQVQsRUFBWSxFQUFuQixFQUF1QixFQUF2QixDQUEwQixLQUExQixDQUFnQyxNQUFNLEVBQXRDO0FBQ0E7QUFDRCxLQVZIO0FBV0QsR0FuQkQ7QUFvQkEsS0FBRyxzQkFBSCxFQUEyQixVQUFTLElBQVQsRUFBZTtBQUN4QyxRQUFNLFFBQVE7QUFDWixVQUFJLEtBRFE7QUFFWixhQUFPLGVBRks7QUFHWixnQkFBVSxJQUhFO0FBSVosa0JBQVksZ0JBSkE7QUFLWixtQkFBYTtBQUxELEtBQWQ7QUFPQSxZQUFRLEdBQVIsRUFDRyxJQURILENBQ1Esb0JBRFIsRUFFRyxJQUZILENBRVEsS0FGUixFQUdHLE1BSEgsQ0FHVSxHQUhWLEVBSUcsR0FKSCxDQUlPLFVBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUI7QUFDdEIsY0FBUSxHQUFSLEVBQ0csSUFESCxDQUNRLHlCQURSLEVBRUcsSUFGSCxDQUVRLEVBQUMsU0FBUSxHQUFULEVBRlIsRUFHRyxNQUhILENBR1UsR0FIVjs7QUFBQSxPQUtHLEdBTEgsQ0FLTyxVQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CO0FBQ3RCLGVBQU8sSUFBSSxJQUFKLENBQVMsQ0FBVCxFQUFZLE9BQW5CLEVBQTRCLEVBQTVCLENBQStCLEtBQS9CLENBQXFDLENBQXJDOztBQUVBO0FBQ0gsT0FURDtBQVVELEtBZkg7QUFnQkQsR0F4QkQ7QUEyQkQsQ0E1REQiLCJmaWxlIjoicXVldWUtYWdlbnQtdGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBxdWV1ZS1hZ2VudC10ZXN0cy5qc1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKCdzdXBlcnRlc3QnKTtcbmNvbnN0IGNoYWkgPSByZXF1aXJlKCdjaGFpJyk7XG5jb25zdCBjaGFpQXNQcm9taXNlZCA9IHJlcXVpcmUoXCJjaGFpLWFzLXByb21pc2VkXCIpO1xuY29uc3QgYXNzZXJ0ID0gY2hhaS5hc3NlcnQ7XG5jb25zdCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcblxuLy8gIEdldCB0aGUgc2VydmVyLiAgV29ya3MgZXZlbiBpZiBub3QgcnVubmluZ1xudmFyIGFwcCA9IHJlcXVpcmUoJy4uL3NlcnZlci9zZXJ2ZXIuanMnKTtcblxuXG4vLyBqdXN0IGEgc2ltcGxlIHRlc3QgdG8gbWFrZSBzdXJlIHRoYXQgc3VwZXIgdGVzdCB3b3Jrcy5cbmRlc2NyaWJlKCdHRVQgL3NvbmdzJywgZnVuY3Rpb24oKSB7XG4gIGl0KCdyZXNwb25kIHdpdGgganNvbicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICByZXF1ZXN0KGFwcClcbiAgICAgIC5nZXQoJy9zb25ncycpXG4gICAgICAuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpXG4gICAgICAuZXhwZWN0KCdDb250ZW50LVR5cGUnLCAvanNvbi8pXG4gICAgICAuZXhwZWN0KDIwMCwgZG9uZSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdHRVQgL3F1ZXVlIHJldHVybnMgd2l0aCBhIGFkbWluIHF1ZXVlJywgZnVuY3Rpb24oKSB7XG4gIGl0KCdnZXQgcXVldWUgc3VjY2Vzc2Z1bGx5JywgZnVuY3Rpb24oZG9uZSkge1xuICAgIHJlcXVlc3QoYXBwKVxuICAgICAgLmdldCgnL2FwaS9xdWV1ZS9nZXRRdWV1ZScpXG4gICAgICAuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpXG4gICAgICAvLyAuZXhwZWN0KCdDb250ZW50LVR5cGUnLCAvanNvbi8pXG4gICAgICAvLyAuZXhwZWN0KDIwMClcbiAgICAgIC5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdwb3N0IHF1ZXVlIHN1Y2Nlc3NmdWxseScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBjb25zdCBzb25nMCA9IHtcbiAgICAgIGlkOiAnMTAwJyxcbiAgICAgIHRpdGxlOiAnbm8gc2xlZXAgdGlsbCBicm9va2x5bicsXG4gICAgICBkdXJhdGlvbjogJzUwJyxcbiAgICAgIHN0cmVhbV91cmw6ICdzb3VuZGNsb3VkLzEwMScsXG4gICAgICBhcnR3b3JrX3VybDogJ2h0dHA6Ly9iZWFzdGllLmNvbScsXG4gICAgfTtcbiAgICByZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3F1ZXVlL2FkZFNvbmcnKVxuICAgICAgLnNlbmQoc29uZzApXG4gICAgICAuZXhwZWN0KDIwMClcbiAgICAgIC8vLmV4cGVjdChcIm1hcmN1cyBpcyBzdG9yZWRcIiwgZG9uZSk7XG4gICAgICAuZW5kKGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3JlcyBmcm9tIHBvc3Q6JywgcmVzLmJvZHkpO1xuICAgICAgICBleHBlY3QocmVzLmJvZHlbMF0uaWQpLnRvLmVxdWFsKHNvbmcwLmlkKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuICBpdCgndGh1bWJzIHVwIHN1Y2Nlc3NmdWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgY29uc3Qgc29uZzEgPSB7XG4gICAgICBpZDogJzEwMScsXG4gICAgICB0aXRsZTogJ2xpa2UgYSBwcmF5ZXInLFxuICAgICAgZHVyYXRpb246ICc3MCcsXG4gICAgICBzdHJlYW1fdXJsOiAnc291bmRjbG91ZC8xMDInLFxuICAgICAgYXJ0d29ya191cmw6ICdtYWRvbm5hLmNvbScsXG4gICAgfTtcbiAgICByZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3F1ZXVlL2FkZFNvbmcnKVxuICAgICAgLnNlbmQoc29uZzEpXG4gICAgICAuZXhwZWN0KDIwMClcbiAgICAgIC5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgLnBvc3QoJy9hcGkvcXVldWUvaW5jcmVhc2VSYW5rJylcbiAgICAgICAgICAuc2VuZCh7J2luZGV4JzonMCd9KVxuICAgICAgICAgIC5leHBlY3QoMjAwKVxuICAgICAgICAgIC8vLmV4cGVjdChcIm1hcmN1cyBpcyBzdG9yZWRcIiwgZG9uZSk7XG4gICAgICAgICAgLmVuZChmdW5jdGlvbihlcnIsIHJlcykge1xuICAgICAgICAgICAgZXhwZWN0KHJlcy5ib2R5WzBdLnVwdm90ZXMpLnRvLmVxdWFsKDEpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncmVzIGZyb20gdGh1bWJzIHVwJywgcmVzLmJvZHkpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9KTtcblxuXG59KTtcblxuIl19