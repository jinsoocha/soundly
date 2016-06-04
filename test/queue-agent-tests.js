// queue-agent-tests.js
var request = require('supertest');

var app = require('../server/server.js');


// just a simple test to make sure that super test works.
describe('GET /songs', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/songs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /queue returns with a admin queue', function() {
  it('get queue successfully', function(done) {
    request(app)
      .get('/api/queue/getQueue')
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('post queue successfully', function(done) {
    const song0 = {
      id: '100',
      title: 'no sleep till brooklyn',
      duration: '50',
      stream_url: 'soundcloud/101',
      artwork_url: 'http://beastie.com',
    };
    request(app)
      .post('/api/queue/addSong')
      .send(song0)
      .expect(200)
      //.expect("marcus is stored", done);
      .end(function(err, res) {
        if (err) return done(err);
        console.log('res from post:', res.body);
        done();
      });
  });



});

