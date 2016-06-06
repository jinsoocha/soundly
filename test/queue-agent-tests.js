// queue-agent-tests.js
var request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const assert = chai.assert;
const expect = chai.expect;

//  Get the server.  Works even if not running
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
        //console.log('res from post:', res.body);
        expect(res.body[0].id).to.equal(song0.id);
        done();
      });
  });
  it('thumbs up successful', function(done) {
    const song1 = {
      id: '101',
      title: 'like a prayer',
      duration: '70',
      stream_url: 'soundcloud/102',
      artwork_url: 'madonna.com',
    };
    request(app)
      .post('/api/queue/addSong')
      .send(song1)
      .expect(200)
      .end(function(err, res) {
        request(app)
          .post('/api/queue/increaseRank')
          .send({'index':'0'})
          .expect(200)
          //.expect("marcus is stored", done);
          .end(function(err, res) {
            expect(res.body[0].upvotes).to.equal(1);
            //console.log('res from thumbs up', res.body);
            done();
        });
      });
  });


});

