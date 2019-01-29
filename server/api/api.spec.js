const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../server');
const server = require('../app');
const mongoose = require('mongoose');
const Message = require('../models/message');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.should();
chai.use(chaiHttp);

let mongoServer;

// creates an in-memory Server instance, so we don't point to production/development dbs
before(function (done) {
  mongoServer = new MongoMemoryServer();
  mongoServer.getConnectionString()
    .then(mongoUri => Promise.resolve(mongoUri))
    .then(mongoUri => mongoose.connect(mongoUri, { useNewUrlParser: true }))
    .then(() => done());
});

after(function (done) {
  mongoose.disconnect()
    .then(() => Promise.resolve())
    .then(mongoServer.stop().then(() => done()));
});

afterEach(function (done) {
  Message.deleteMany({}).then(() => done());
});

// Test suite for testing API endpoins
describe('Api Endpoints', function () {
  
  it('should return empty messages under /messages GET', function (done) {
    chai.request(server)
      .get('/api/messages')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;

        res.body.should.be.a('array');
        done();
      })
  });

  it('should return 2 messages under /messages GET', function (done) {
    let dummyMessage = {
      title: 'Hello',
      body: 'World'
    }
    let message1 = new Message(dummyMessage).save();
    let message2 = new Message(dummyMessage).save();
    Promise.all([message1, message2]).then(() => {

      chai.request(server)
        .get('/api/messages')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');

          res.body.length.should.be.eql(2);
          res.body[0].title.should.be.eql('Hello');
          res.body[1].body.should.be.eql('World');

          done();
        });

      });
  });

  it('should save a new message under /message POST', function (done) {
    let dummyMessage = {
      title: 'Hello',
      body: 'World'
    }
    
    chai.request(server)
      .post('/api/message')
      .send(dummyMessage)
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;

        res.body.title.should.eql('Hello');
        res.body.body.should.eql('World');

        return Message.countDocuments();
      })
      .then((count) => {
        count.should.eql(1);
        done();
      });
  });

});