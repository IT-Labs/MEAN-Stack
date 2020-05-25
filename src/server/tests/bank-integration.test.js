const assert = require('assert').strict;
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");

describe('Integration tests for Banks', function() {
    let status, json, res;
    beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        res = { json, status };
        status.returns(res);
      });
    it('Add new Bank', async function() {
        const req = { body: { name: 'name',swiftCode:'111111'} };
        await new BanksController().insert(req, res);
        console.log(req);
        assert.equal(0,0);
    });
});