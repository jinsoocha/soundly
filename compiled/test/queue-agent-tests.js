'use strict';

// queue-agent-tests.js
var request = require('supertest');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var assert = chai.assert;
var expect = chai.expect;
var User = require('../server/models/User.js');

//  Get the server.  Works even if not running
var app = require('../server/server.js');

// just a simple test to make sure that super test works.
describe('GET /songs', function () {
  it('respond with json', function (done) {
    request(app).get('/songs').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
  });
});

describe('GET /queue returns with a admin queue', function () {

  var roomid = '00001';

  before(function (done) {
    //  create a user with the roomid;
    new User({ username: 'testqueueuser', password: 'pw', roomid: roomid, queue: [] }).save(function (err, success) {
      return done(err);
    });
  });

  after(function (done) {
    User.remove({ roomid: roomid }).then(function () {
      return done();
    });
  });

  it('get queue successfully', function (done) {
    request(app).get('/api/queue/getQueue').set('Accept', 'application/json')
    // .expect('Content-Type', /json/)
    // .expect(200)
    .send({ roomid: roomid }).end(function (err, res) {
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
    request(app).post('/api/queue/addSong').send({ song: song0, roomid: roomid }).expect(200)
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
    request(app).post('/api/queue/addSong').send({ song: song1, roomid: roomid }).expect(200).end(function (err, res) {
      request(app).post('/api/queue/increaseRank').send({ 'index': '0', roomid: roomid }).expect(200)
      //.expect("marcus is stored", done);
      .end(function (err, res) {
        expect(res.body[0].upvotes).to.equal(1);
        //console.log('res from thumbs up', res.body);
        done();
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvcXVldWUtYWdlbnQtdGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsSUFBSSxVQUFVLFFBQVEsV0FBUixDQUFkO0FBQ0EsSUFBTSxPQUFPLFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTSxpQkFBaUIsUUFBUSxrQkFBUixDQUF2QjtBQUNBLElBQU0sU0FBUyxLQUFLLE1BQXBCO0FBQ0EsSUFBTSxTQUFTLEtBQUssTUFBcEI7QUFDQSxJQUFNLE9BQU8sUUFBUSwwQkFBUixDQUFiOzs7QUFHQSxJQUFJLE1BQU0sUUFBUSxxQkFBUixDQUFWOzs7QUFJQSxTQUFTLFlBQVQsRUFBdUIsWUFBVztBQUNoQyxLQUFHLG1CQUFILEVBQXdCLFVBQVMsSUFBVCxFQUFlO0FBQ3JDLFlBQVEsR0FBUixFQUNHLEdBREgsQ0FDTyxRQURQLEVBRUcsR0FGSCxDQUVPLFFBRlAsRUFFaUIsa0JBRmpCLEVBR0csTUFISCxDQUdVLGNBSFYsRUFHMEIsTUFIMUIsRUFJRyxNQUpILENBSVUsR0FKVixFQUllLElBSmY7QUFLRCxHQU5EO0FBT0QsQ0FSRDs7QUFVQSxTQUFTLHVDQUFULEVBQWtELFlBQVc7O0FBRTNELE1BQU0sU0FBUyxPQUFmOztBQUVBLFNBQU8sVUFBUyxJQUFULEVBQWU7O0FBRXBCLFFBQUksSUFBSixDQUFTLEVBQUMsVUFBUyxlQUFWLEVBQTJCLFVBQVMsSUFBcEMsRUFBMEMsUUFBUSxNQUFsRCxFQUEwRCxPQUFPLEVBQWpFLEVBQVQsRUFDQyxJQURELENBQ00sVUFBQyxHQUFELEVBQU0sT0FBTjtBQUFBLGFBQWtCLEtBQUssR0FBTCxDQUFsQjtBQUFBLEtBRE47QUFFRCxHQUpEOztBQU1BLFFBQU0sVUFBUyxJQUFULEVBQWU7QUFDbkIsU0FBSyxNQUFMLENBQVksRUFBRSxRQUFRLE1BQVYsRUFBWixFQUFnQyxJQUFoQyxDQUFxQztBQUFBLGFBQU0sTUFBTjtBQUFBLEtBQXJDO0FBQ0QsR0FGRDs7QUFNQSxLQUFHLHdCQUFILEVBQTZCLFVBQVMsSUFBVCxFQUFlO0FBQzFDLFlBQVEsR0FBUixFQUNHLEdBREgsQ0FDTyxxQkFEUCxFQUVHLEdBRkgsQ0FFTyxRQUZQLEVBRWlCLGtCQUZqQjs7O0FBQUEsS0FLRyxJQUxILENBS1EsRUFBQyxRQUFRLE1BQVQsRUFMUixFQU1HLEdBTkgsQ0FNTyxVQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CO0FBQ3RCLFVBQUksR0FBSixFQUFTLE9BQU8sS0FBSyxHQUFMLENBQVA7QUFDVDtBQUNELEtBVEg7QUFVRCxHQVhEOztBQWFBLEtBQUcseUJBQUgsRUFBOEIsVUFBUyxJQUFULEVBQWU7QUFDM0MsUUFBTSxRQUFRO0FBQ1osVUFBSSxLQURRO0FBRVosYUFBTyx3QkFGSztBQUdaLGdCQUFVLElBSEU7QUFJWixrQkFBWSxnQkFKQTtBQUtaLG1CQUFhO0FBTEQsS0FBZDtBQU9BLFlBQVEsR0FBUixFQUNHLElBREgsQ0FDUSxvQkFEUixFQUVHLElBRkgsQ0FFUSxFQUFDLE1BQU0sS0FBUCxFQUFjLFFBQVEsTUFBdEIsRUFGUixFQUdHLE1BSEgsQ0FHVSxHQUhWOztBQUFBLEtBS0csR0FMSCxDQUtPLFVBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUI7QUFDdEIsVUFBSSxHQUFKLEVBQVMsT0FBTyxLQUFLLEdBQUwsQ0FBUDs7QUFFVCxhQUFPLElBQUksSUFBSixDQUFTLENBQVQsRUFBWSxFQUFuQixFQUF1QixFQUF2QixDQUEwQixLQUExQixDQUFnQyxNQUFNLEVBQXRDO0FBQ0E7QUFDRCxLQVZIO0FBV0QsR0FuQkQ7QUFvQkEsS0FBRyxzQkFBSCxFQUEyQixVQUFTLElBQVQsRUFBZTtBQUN4QyxRQUFNLFFBQVE7QUFDWixVQUFJLEtBRFE7QUFFWixhQUFPLGVBRks7QUFHWixnQkFBVSxJQUhFO0FBSVosa0JBQVksZ0JBSkE7QUFLWixtQkFBYTtBQUxELEtBQWQ7QUFPQSxZQUFRLEdBQVIsRUFDRyxJQURILENBQ1Esb0JBRFIsRUFFRyxJQUZILENBRVEsRUFBQyxNQUFNLEtBQVAsRUFBYyxRQUFRLE1BQXRCLEVBRlIsRUFHRyxNQUhILENBR1UsR0FIVixFQUlHLEdBSkgsQ0FJTyxVQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CO0FBQ3RCLGNBQVEsR0FBUixFQUNHLElBREgsQ0FDUSx5QkFEUixFQUVHLElBRkgsQ0FFUSxFQUFDLFNBQVEsR0FBVCxFQUFjLFFBQVEsTUFBdEIsRUFGUixFQUdHLE1BSEgsQ0FHVSxHQUhWOztBQUFBLE9BS0csR0FMSCxDQUtPLFVBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUI7QUFDdEIsZUFBTyxJQUFJLElBQUosQ0FBUyxDQUFULEVBQVksT0FBbkIsRUFBNEIsRUFBNUIsQ0FBK0IsS0FBL0IsQ0FBcUMsQ0FBckM7O0FBRUE7QUFDSCxPQVREO0FBVUQsS0FmSDtBQWdCRCxHQXhCRDtBQTJCRCxDQTVFRCIsImZpbGUiOiJxdWV1ZS1hZ2VudC10ZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHF1ZXVlLWFnZW50LXRlc3RzLmpzXG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJ3N1cGVydGVzdCcpO1xuY29uc3QgY2hhaSA9IHJlcXVpcmUoJ2NoYWknKTtcbmNvbnN0IGNoYWlBc1Byb21pc2VkID0gcmVxdWlyZShcImNoYWktYXMtcHJvbWlzZWRcIik7XG5jb25zdCBhc3NlcnQgPSBjaGFpLmFzc2VydDtcbmNvbnN0IGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uL3NlcnZlci9tb2RlbHMvVXNlci5qcycpO1xuXG4vLyAgR2V0IHRoZSBzZXJ2ZXIuICBXb3JrcyBldmVuIGlmIG5vdCBydW5uaW5nXG52YXIgYXBwID0gcmVxdWlyZSgnLi4vc2VydmVyL3NlcnZlci5qcycpO1xuXG5cbi8vIGp1c3QgYSBzaW1wbGUgdGVzdCB0byBtYWtlIHN1cmUgdGhhdCBzdXBlciB0ZXN0IHdvcmtzLlxuZGVzY3JpYmUoJ0dFVCAvc29uZ3MnLCBmdW5jdGlvbigpIHtcbiAgaXQoJ3Jlc3BvbmQgd2l0aCBqc29uJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIHJlcXVlc3QoYXBwKVxuICAgICAgLmdldCgnL3NvbmdzJylcbiAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAgICAgIC5leHBlY3QoJ0NvbnRlbnQtVHlwZScsIC9qc29uLylcbiAgICAgIC5leHBlY3QoMjAwLCBkb25lKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ0dFVCAvcXVldWUgcmV0dXJucyB3aXRoIGEgYWRtaW4gcXVldWUnLCBmdW5jdGlvbigpIHtcblxuICBjb25zdCByb29taWQgPSAnMDAwMDEnO1xuXG4gIGJlZm9yZShmdW5jdGlvbihkb25lKSB7XG4gICAgLy8gIGNyZWF0ZSBhIHVzZXIgd2l0aCB0aGUgcm9vbWlkO1xuICAgIG5ldyBVc2VyKHt1c2VybmFtZTondGVzdHF1ZXVldXNlcicsIHBhc3N3b3JkOidwdycsIHJvb21pZDogcm9vbWlkLCBxdWV1ZTogW119KVxuICAgIC5zYXZlKChlcnIsIHN1Y2Nlc3MpID0+IGRvbmUoZXJyKSk7XG4gIH0pO1xuXG4gIGFmdGVyKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBVc2VyLnJlbW92ZSh7IHJvb21pZDogcm9vbWlkIH0pLnRoZW4oKCkgPT4gZG9uZSgpKTtcbiAgfSk7XG4gIFxuXG5cbiAgaXQoJ2dldCBxdWV1ZSBzdWNjZXNzZnVsbHknLCBmdW5jdGlvbihkb25lKSB7XG4gICAgcmVxdWVzdChhcHApXG4gICAgICAuZ2V0KCcvYXBpL3F1ZXVlL2dldFF1ZXVlJylcbiAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAgICAgIC8vIC5leHBlY3QoJ0NvbnRlbnQtVHlwZScsIC9qc29uLylcbiAgICAgIC8vIC5leHBlY3QoMjAwKVxuICAgICAgLnNlbmQoe3Jvb21pZDogcm9vbWlkfSlcbiAgICAgIC5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdwb3N0IHF1ZXVlIHN1Y2Nlc3NmdWxseScsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBjb25zdCBzb25nMCA9IHtcbiAgICAgIGlkOiAnMTAwJyxcbiAgICAgIHRpdGxlOiAnbm8gc2xlZXAgdGlsbCBicm9va2x5bicsXG4gICAgICBkdXJhdGlvbjogJzUwJyxcbiAgICAgIHN0cmVhbV91cmw6ICdzb3VuZGNsb3VkLzEwMScsXG4gICAgICBhcnR3b3JrX3VybDogJ2h0dHA6Ly9iZWFzdGllLmNvbScsXG4gICAgfTtcbiAgICByZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3F1ZXVlL2FkZFNvbmcnKVxuICAgICAgLnNlbmQoe3Nvbmc6IHNvbmcwLCByb29taWQ6IHJvb21pZH0pXG4gICAgICAuZXhwZWN0KDIwMClcbiAgICAgIC8vLmV4cGVjdChcIm1hcmN1cyBpcyBzdG9yZWRcIiwgZG9uZSk7XG4gICAgICAuZW5kKGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3JlcyBmcm9tIHBvc3Q6JywgcmVzLmJvZHkpO1xuICAgICAgICBleHBlY3QocmVzLmJvZHlbMF0uaWQpLnRvLmVxdWFsKHNvbmcwLmlkKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gIH0pO1xuICBpdCgndGh1bWJzIHVwIHN1Y2Nlc3NmdWwnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgY29uc3Qgc29uZzEgPSB7XG4gICAgICBpZDogJzEwMScsXG4gICAgICB0aXRsZTogJ2xpa2UgYSBwcmF5ZXInLFxuICAgICAgZHVyYXRpb246ICc3MCcsXG4gICAgICBzdHJlYW1fdXJsOiAnc291bmRjbG91ZC8xMDInLFxuICAgICAgYXJ0d29ya191cmw6ICdtYWRvbm5hLmNvbScsXG4gICAgfTtcbiAgICByZXF1ZXN0KGFwcClcbiAgICAgIC5wb3N0KCcvYXBpL3F1ZXVlL2FkZFNvbmcnKVxuICAgICAgLnNlbmQoe3Nvbmc6IHNvbmcxLCByb29taWQ6IHJvb21pZH0pXG4gICAgICAuZXhwZWN0KDIwMClcbiAgICAgIC5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICAgICAgcmVxdWVzdChhcHApXG4gICAgICAgICAgLnBvc3QoJy9hcGkvcXVldWUvaW5jcmVhc2VSYW5rJylcbiAgICAgICAgICAuc2VuZCh7J2luZGV4JzonMCcsIHJvb21pZDogcm9vbWlkfSlcbiAgICAgICAgICAuZXhwZWN0KDIwMClcbiAgICAgICAgICAvLy5leHBlY3QoXCJtYXJjdXMgaXMgc3RvcmVkXCIsIGRvbmUpO1xuICAgICAgICAgIC5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICAgICAgICAgIGV4cGVjdChyZXMuYm9keVswXS51cHZvdGVzKS50by5lcXVhbCgxKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3JlcyBmcm9tIHRodW1icyB1cCcsIHJlcy5ib2R5KTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfSk7XG5cblxufSk7XG5cbiJdfQ==