const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../api/app');
// const { getConnection } = require('./connectionMock');
// const { MongoClient } = require('mongodb');

const { expect } = chai;

describe('', () => {
});

describe('POST /login', () => {
  describe('When email and password arent filled', () => {
    let response;

    before (async () => {
      response = await chai.request(app).post('/login').send({});
    })

    it('return HTPP 401', () => {
      expect(response).to.have.status(401);
    });

    it('return body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has `message` property', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('message property has its proper message ', () => {
      expect(response.body.message).to.be.equal('All fields must be filled')
    });
  });

  describe('When email doesn`t exists', () => {
    it('return HTTP 401', () => {

    });

    it('return body', () => {

    });

    it('response object has `message` property', () => {

    });

    it('message property has its proper message ', () => {

    });
  });

  describe('When login is successful', () => {
    it('return HTTP 200', () => {

    });

    it('return token', () => {

    });
  });
});
