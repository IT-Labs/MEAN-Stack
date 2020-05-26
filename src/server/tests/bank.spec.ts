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

        // Test to get all banks record
        // it("should get all banks record", (done) => {
        //      chai.request(app)
        //          .get('/api/banks')
        //          .then()
        //          .end((err, res) => {
        //              res.should.have.status(200);
        //              res.body.should.be.a('Array');
        //              done();
        //           });
        //  });        

        //  it("should get all banks record", (done) => {
        //     chai.request(app)
        //         .get('/api/banks')
        //         .then(res => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('Array');
        //          });
        // });

        it('should get all banks record', async () => {
            const result = await chai.request(app).get('/api/banks');
            result.should.have.status(200);
            result.body.should.be.a('Array');
        });

        it('should get all banks record', async () => {
            let id = "5eb060deb7450735fc26a004";
            const result = await chai.request(app).get(`/api/banks/${id}`);
            result.should.have.status(200);
            result.body.should.be.a('object');
        });
         
    });
});