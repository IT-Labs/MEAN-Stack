process.env.NODE_ENV = 'test';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import MeanStackServer from '../mean-stack-server';
import { doesNotMatch } from 'assert';

chai.use(chaiHttp);

const server = new MeanStackServer();
server.start(3001);
const app = server.theApp;

chai.should();

describe('Banks', () => {
  describe('GET /', () => {
    it('should get all banks', async () => {
      const result = await chai.request(app).get('/api/banks');
      result.should.have.status(200);
      result.body.should.be.a('object');
    });
  });
});