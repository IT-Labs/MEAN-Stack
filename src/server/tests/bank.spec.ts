import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import MeanStackServer from '../mean-stack-server';
import { doesNotMatch } from 'assert';

chai.use(chaiHttp);

let server = new MeanStackServer();
server.start(3001);
let app = server.APPLICATION;

chai.should();
describe("Banks", () => {
    describe("GET /", () => {

        it('should get all banks record', async () => {
            const result = await chai.request(app).get('/api/banks');
            result.should.have.status(200);
            result.body.should.be.a('Array');
        }).timeout(5000);

        it('should get one banks record', async () => {
            let id = "5eb060deb7450735fc26a004";
            const result = await chai.request(app).get(`/api/banks/${id}`);
            result.should.have.status(200);
            result.body.should.be.a('object');
        }).timeout(5000);;
         
    });
});

describe("Companies", () => {
    describe("GET /", () => {

        it('should get all companies record', async () => {
            const result = await chai.request(app).get('/api/companies');
            result.should.have.status(200);
            result.body.should.be.a('Array');
        }).timeout(5000);

        it('should get one company record', async () => {
            let id = "5eb14c90f3640e73abb43003";
            const result = await chai.request(app).get(`/api/company/${id}`);
            result.should.have.status(200);
            result.body.should.be.a('object');
        }).timeout(5000);;
         
    });
});