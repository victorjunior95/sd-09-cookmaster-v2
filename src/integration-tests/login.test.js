const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../api/app');
const { getConnection } = require('./connectionMock');
const { MongoClient } = require('mongodb');

const { expect } = chai;

describe('POST /LOGIN', () => {
  before(() => {
    sinon.stub(MongoClient, 'connect').resolves(getConnection);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('when email and password is not declared', () => {
    let response;
    
    before(async () => {
      response = await chai.request(app).post('/login').send({});
    });

    it('expect HTTP STATUS = 401', () => {
      expect(response).to.have.status(401);
    });

    it('expect response body is an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('expect body have property message', () => {
      expect(response.body).to.have.property('message')
    });

    it('expect body message is a correct message', () => {
      expect(response.body.message).to.be.equal('All fields must be filled')
    });
  });

  describe('when email is not declared', () => {
    let response;
    
    before(async () => {
      response = await chai.request(app).post('/login').send({ password: 'Abc123' });
    });

    it('expect HTTP STATUS = 401', () => {
      expect(response).to.have.status(401);
    });

    it('expect response body is an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('expect body have property message', () => {
      expect(response.body).to.have.property('message')
    });

    it('expect body message is a correct message', () => {
      expect(response.body.message).to.be.equal('All fields must be filled')
    });
  });

  describe('when password is not declared', () => {
    let response;
    
    before(async () => {
      response = await chai.request(app).post('/login').send({ email: 'teste@gmail.com' });
    });

    it('expect HTTP STATUS = 401', () => {
      expect(response).to.have.status(401);
    });

    it('expect response body is an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('expect body have property message', () => {
      expect(response.body).to.have.property('message')
    });

    it('expect body message is a correct message', () => {
      expect(response.body.message).to.be.equal('All fields must be filled')
    });
  });
});
