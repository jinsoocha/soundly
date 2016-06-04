// user-tests.js
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const assert = chai.assert;
chai.use(chaiAsPromised);
const should = chai.should();
const expect = chai.expect;
const users = require('../server/routes/users.js');
const userSchema = require('../server/models/User.js');

describe('can register and signin users', function() {

  beforeEach(function(done) {
    //  runs before all tests in this block
    users.doSignup('register', 'registerpw').should.be.fulfilled.then(function(user) {
      done();
    });
  });

  afterEach(function(done) {
    userSchema.remove({}).then(() => done());
  });

  it('it should successfully generate a room id', function(done) {
    users.generateRoomId('testusername').should.be.fulfilled.then(function(roomid) {
      expect(roomid).to.be.a('string');
    }).should.notify(done);
  });

  it('it should generate a token', function(done) {
    expect(users.generateToken('string')).to.be.a('string');
    done();
  });

  it('it should register a new user', function(done) {
    users.doSignup('testusername', 'testpassword').should.be.fulfilled.then(function(user) {
      expect(user).to.have.property('username');
    }).should.notify(done);
  });

  it('it should signin', function(done) {
    users.doSignin('register', 'registerpw').should.be.fulfilled.then(function(signin) {
      expect(signin).to.have.property('username');
    }).should.notify(done);
  });

  it('it should fail with a non-existent user', function(done) {
    users.doSignin('baduser', 'registerpw').should.be.rejected.and.notify(done);
  });
  it('it should fail with a bad password', function(done) {
    users.doSignin('register', 'badpassword').should.be.rejected.and.notify(done);
  });
});
