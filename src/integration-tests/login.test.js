const chai = require('chai');
const sinon = require('sinon');
const chaihttp = require('chai-http');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaihttp);
const { expect } = chai;

const validUserRegister = { name: "Albert Einstein", email: 'aeinstein@email.com', password: '123456' };
const validUser = { email: 'aeinstein@email.com', password: '123456' };
const invalidUsers = {
  user0: { email: 'aeinstein@email.com', password: '' },
  user1: { email: 'aeinstein@email.com', password: 1234 },
  user2: { email: '', password: 123456 },
  user3: { email: 'aeinstein@ema@il.com', password: 123456 },
}

describe('/POST - LOGIN USER; the body of request should have, "email", "password" to receive JWT', () => {
  describe('When the request was rejected, with no correct object on the body of request', () => {
    describe('The body havent property password', () => {
      let response;
      before(async () => {
        response = await chai.request(server).post('/login/').send(invalidUsers.user0);
      });

      it('Should return status 401', () => {
        expect(response).to.have.status(401);
      });

      it('Should return an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('Should have the error message, with property "message"', () => {
        expect(response.body.message).to.be.equal('All fields must be filled');
      });
    });

    describe('The body havent property password with more than five characters', () => {
      let response;
      before(async () => {
        response = await chai.request(server).post('/login/').send(invalidUsers.user1);
      });

      it('Should return status 401', () => {
        expect(response).to.have.status(401);
      });

      it('Should return an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('Should have the error message, with property "message"', () => {
        expect(response.body.message).to.be.equal('All fields must be filled');
      });
    });

    describe('The body havent property email', () => {
      let response;
      before(async () => {
        response = await chai.request(server).post('/login/').send(invalidUsers.user2);
      });

      it('Should return status 401', () => {
        expect(response).to.have.status(401);
      });

      it('Should return an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('Should have the error message, with property "message"', () => {
        expect(response.body.message).to.be.equal('All fields must be filled');
      });
    });

    describe('The body havent property password with more than five characters', () => {
      let response;
      before(async () => {
        response = await chai.request(server).post('/login/').send(invalidUsers.user3);
      });

      it('Should return status 401', () => {
        expect(response).to.have.status(401);
      });

      it('Should return an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('Should have the error message, with property "message"', () => {
        expect(response.body.message).to.be.equal('Incorrect username or password');
      });
    });
  });

  describe('When the request was accepted, will return a JWT', () => {
    let connectionMock;
    let response;
    before(async () => {
      const DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
      connectionMock = await MongoClient.connect(URLMock, OPTIONS);
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validUserRegister);

      response = await chai.request(server).post('/login/').send(validUser);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
    });

    it('Should return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Should return an object, with property "token"', () => {
      expect(response.body).to.be.an('object').with.property('token');
    });

    it('Should contain the JWT, in property "token"', () => {
      expect(response.body.token.length).to.be.equal(211);
    });
  });
});