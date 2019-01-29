var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
chai.should();

chai.use(chaiHttp);

after(function(done) {
  done();
});

// Test suite for testing API endpoins
describe('Api Endpoints', function() {
  it('should list ALL messages under /messages GET', function(done) {
      chai.request(server)
        .get('/api/messages')
        .end((err, res) => {
            console.log(res.body);

            res.should.have.status(200);
            res.should.be.json;
            
            res.body.should.be.a('array');
            done();
        })

  });
  
});