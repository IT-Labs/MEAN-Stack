import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
chai.use(chaiHttp);

describe('Integration tests for Banks', ()=> {
    it('Add new Bank', async () => {
        return chai
        .request('http://localhost:3001')
        .get('/api/banks')
        .then(res => {
            chai.expect(res.status).to.eql(200)
        });
    });
});