import app = require('../mean-stack-server'); // Link to your server file
import supertest = require('supertest');
const request = supertest(app)


describe('Bank Endpoints', () => {
    it('should create a new bank', async () => {
      const res = await request('http://localhost:3001')
        .post('/api/banks')
        .send({
          name: 'name',
          swiftCode: '11111',
        });
     expect(res.body).toHaveProperty('post');
    });
    // it('should fetch a single bank', async () => {
    //   const bankId = 1;
    //   const res = await request(app).get(`/api/banks/${bankId}`);
    //   expect(res.statusCode).toEqual(200);
    //   expect(res.body).toHaveProperty('post');
    // });
});