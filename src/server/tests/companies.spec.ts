import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
const app  = process.env.HOST + ':' + process.env.PORT;

chai.use(chaiHttp);
chai.should();

describe('Companies', async () => {
  describe('GET /', () => {
    it('should get all companies', async () => {
      const result =  await chai.request(app).get('/api/companies');
      result.should.have.status(200);
      // result.body.should.be.a('object');
    });
  });
});
