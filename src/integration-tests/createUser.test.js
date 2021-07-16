const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../api/app');
const getConnection = require('./connectionMock');
const { MongoClient } = require('mongodb');

const { expect } = chai;

describe('POST /users', () => {
  describe('when is successfully created', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(app)
        .post('/users')
        .send({
          name: 'Erick Jacquin',
          email: 'erickjacquin@gmail.com',
          password: '12345678',
        });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('returns the status code 201', () => {
      expect(response).to.have.status(201);
    });

    it('returns an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('the object have a \'user\' property', () => {
      expect(response.body).to.have.property('user');
    });

    it('the \'user\' object contains an \'_id\' property', () => {
      expect(response.body.user).to.have.property('_id');
    });
  });
  describe('when any of the fields are not informed', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(app)
        .post('/users')
        .send({
          email: 'erickjacquin@gmail.com',
          password: '12345678',
        });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('return the status code 400', () => {
      expect(response).to.have.status(400);
    });

    it('returns an object', () => {
      expect(response).to.be.an('object');
    });

    it('the object have an \'message\' property', () => {
      expect(response.body).to.have.property('message');
    });

    it('the \'message\' property has the text \'Invalid entries. Try again.\'', () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });
  });
});
