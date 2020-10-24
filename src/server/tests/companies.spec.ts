//import * as chai from 'chai';
//import chaiHttp = require('chai-http');
//import 'mocha';
//import MeanStackServer from '../mean-stack-server';
//import { doesNotMatch } from 'assert';

//chai.use(chaiHttp);

//const server = new MeanStackServer();
//server.start(3002);
//const app = server.APPLICATION;

//chai.should();

//describe('Companies', () => {
//  describe('GET /', () => {
//    it('should get all companies record', async () => {
//      const result = await chai.request(app).get('/api/companies');
//      result.should.have.status(200);
//      result.body.should.be.a('Array');
//    });

//    it('should get company by specified id', async () => {
//      const id = '5eb14c90f3640e73abb43003';
//      const result = await chai.request(app).get(`/api/companies/${id}`);
//      result.should.have.status(200);
//      result.body.should.be.a('object');
//    });

//    // it('should return bad request because wrong id specified', async () => {
//    //   const id = '5eb14c31b38cab6d1b3ce999';
//    //   const result = await chai.request(app).get(`/api/companies/${id}`);
//    //   result.should.have.status(400);
//    //   result.body.should.be.a('object');
//    // });

//    it('should add new company', async () => {
//      const result = await chai.request(app).post('/api/companies').send({
//        name: 'test company',
//        taxNumber: '11111',
//        address: 'address',
//        city: 'Skopje',
//        zipcode: '1000',
//        state: 'N/A',
//        country: 'Macedonia',
//      });
//      result.should.have.status(200);
//      result.body.should.have.property('id');
//    });

//    it('should update company', async () => {
//      const id = '5eb14c90f3640e73abb43003';
//      const result = await chai.request(app).put(`/api/companies/${id}`).send({
//        name: 'test edit company',
//        taxNumber: '11111',
//        address: 'address',
//        city: 'Skopje',
//        zipcode: '1000',
//        state: 'N/A',
//        country: 'Macedonia',
//      });
//      result.should.have.status(200);
//    });

//    it('should delete company', async () => {
//      const id = '5eb14c31b38cab6d1b3ce978';
//      const result = await chai.request(app).delete(`/api/companies/${id}`);
//      result.should.have.status(200);
//    });

//    it('POST - should return validation message for required name field', async () => {
//      const result = await chai.request(app).post('/api/companies').send({
//        taxNumber: '11111',
//        address: 'address',
//        city: 'Skopje',
//        zipcode: '1000',
//        state: 'N/A',
//        country: 'Macedonia',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"name" is required');
//    });

//    it('POST - should return validation message for required taxNumber field', async () => {
//      const result = await chai.request(app).post('/api/companies').send({
//        name: 'test company',
//        address: 'address',
//        city: 'Skopje',
//        zipcode: '1000',
//        state: 'N/A',
//        country: 'Macedonia',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"taxNumber" is required');
//    });

//    it('POST - should return validation message for required address field', async () => {
//      const result = await chai.request(app).post('/api/companies').send({
//        name: 'test edit company',
//        taxNumber: '11111',
//        city: 'Skopje',
//        zipcode: '1000',
//        state: 'N/A',
//        country: 'Macedonia',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"address" is required');
//    });

//    it('POST - should return validation message for required city field', async () => {
//      const result = await chai.request(app).post('/api/companies').send({
//        name: 'test edit company',
//        taxNumber: '11111',
//        address: 'address',
//        zipcode: '1000',
//        state: 'N/A',
//        country: 'Macedonia',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"city" is required');
//    });

//    it('POST - should return validation message for required zip code field', async () => {
//      const result = await chai.request(app).post('/api/companies').send({
//        name: 'test edit company',
//        taxNumber: '11111',
//        address: 'address',
//        city: 'Skopje',
//        state: 'N/A',
//        country: 'Macedonia',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"zipcode" is required');
//    });

//    it('POST - should return validation message for required state field', async () => {
//      const result = await chai.request(app).post('/api/companies').send({
//        name: 'test edit company',
//        taxNumber: '11111',
//        address: 'address',
//        city: 'Skopje',
//        zipcode: '1000',
//        country: 'Macedonia',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"state" is required');
//    });

//    it('POST - should return validation message for required country field', async () => {
//      const result = await chai.request(app).post('/api/companies').send({
//        name: 'test edit company',
//        taxNumber: '11111',
//        address: 'address',
//        city: 'Skopje',
//        state: 'N/A',
//        zipcode: '1000',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"country" is required');
//    });

//    it('PUT - should return validation message for required name field', async () => {
//      const id = '5eb14c90f3640e73abb43003';
//      const result = await chai.request(app).put(`/api/companies/${id}`).send({
//        taxNumber: '11111',
//        address: 'address',
//        city: 'Skopje',
//        zipcode: '1000',
//        state: 'N/A',
//        country: 'Macedonia',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"name" is required');
//    });

//    it('PUT - should return validation message for required taxNumber field', async () => {
//      const id = '5eb14c90f3640e73abb43003';
//      const result = await chai.request(app).put(`/api/companies/${id}`).send({
//        name: 'test company',
//        address: 'address',
//        city: 'Skopje',
//        zipcode: '1000',
//        state: 'N/A',
//        country: 'Macedonia',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"taxNumber" is required');
//    });

//    it('PUT - should return validation message for required address field', async () => {
//      const id = '5eb14c90f3640e73abb43003';
//      const result = await chai.request(app).put(`/api/companies/${id}`).send({
//        name: 'test edit company',
//        taxNumber: '11111',
//        city: 'Skopje',
//        zipcode: '1000',
//        state: 'N/A',
//        country: 'Macedonia',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"address" is required');
//    });

//    it('PUT - should return validation message for required city field', async () => {
//      const id = '5eb14c90f3640e73abb43003';
//      const result = await chai.request(app).put(`/api/companies/${id}`).send({
//        name: 'test edit company',
//        taxNumber: '11111',
//        address: 'address',
//        zipcode: '1000',
//        state: 'N/A',
//        country: 'Macedonia',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"city" is required');
//    });

//    it('PUT - should return validation message for required zip code field', async () => {
//      const id = '5eb14c90f3640e73abb43003';
//      const result = await chai.request(app).put(`/api/companies/${id}`).send({
//        name: 'test edit company',
//        taxNumber: '11111',
//        address: 'address',
//        city: 'Skopje',
//        state: 'N/A',
//        country: 'Macedonia',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"zipcode" is required');
//    });

//    it('PUT - should return validation message for required state field', async () => {
//      const id = '5eb14c90f3640e73abb43003';
//      const result = await chai.request(app).put(`/api/companies/${id}`).send({
//        name: 'test edit company',
//        taxNumber: '11111',
//        address: 'address',
//        city: 'Skopje',
//        zipcode: '1000',
//        country: 'Macedonia',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"state" is required');
//    });

//    it('PUT - should return validation message for required country field', async () => {
//      const id = '5eb14c90f3640e73abb43003';
//      const result = await chai.request(app).put(`/api/companies/${id}`).send({
//        name: 'test edit company',
//        taxNumber: '11111',
//        address: 'address',
//        city: 'Skopje',
//        state: 'N/A',
//        zipcode: '1000',
//      });
//      result.should.have.status(400);
//      result.body.should.have.property('error', '"country" is required');
//    });
//  });
//});
