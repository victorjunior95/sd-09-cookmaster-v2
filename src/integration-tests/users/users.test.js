const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const connect = require('../connectionMock');
const { describe } = require('mocha');
const { MongoClient } = require('mongodb');
const app = require('../../api/app');

chai.use(chaiHttp);
const { expect } = chai;
let connectionMock;

describe('1 - Users registrations', () => {
  describe('When a invalid payload is provided', () => {
    describe('when the name is missing', () => {
      const payload = {
        email: 'erickjecquin@gmail.com',
        password: '12345678',
      };
      let response;

      before(async () => {
        response = await chai.request(app).post('/users').send(payload);
      });

      it('should return status 401', async () => {
        expect(response).to.have.status(401);
      });

      it('should return an object in the body', () => {
        expect(response.body).to.be.an('object');
      });

      it('should contain the key message', () => {
        expect(response.body).to.include.all.keys('message');
      });

      it('the propertyr "message" should contain an explanatory message', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('when the email is missing', () => {
      const payload = {
        name: 'Jacquin',
        password: '12345678',
      };
      let response;

      before(async () => {
        response = await chai.request(app).post('/users').send(payload);
      });

      it('should return status 401', async () => {
        expect(response).to.have.status(401);
      });

      it('should return an object in the body', () => {
        expect(response.body).to.be.an('object');
      });

      it('should contain the key message', () => {
        expect(response.body).to.include.all.keys('message');
      });

      it('the propertyr "message" should contain an explanatory message', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('when the password is missing', () => {
      const payload = {
        email: 'erickjecquin@gmail.com',
        name: 'Jacquin',
      };
      let response;

      before(async () => {
        response = await chai.request(app).post('/users').send(payload);
      });

      it('should return status 401', async () => {
        expect(response).to.have.status(401);
      });

      it('should return an object in the body', () => {
        expect(response.body).to.be.an('object');
      });

      it('should contain the key message', () => {
        expect(response.body).to.include.all.keys('message');
      });

      it('the propertyr "message" should contain an explanatory message', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });
  });

  describe('when a valid payload is provided', () => {
    const payload = {
      email: 'erickjecquin@gmail.com',
      name: 'Jacquin',
      password: '12345678',
    };
    let response;

    before(async () => {
      connectionMock = await connect();
      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await (await chai.request(app).post('/users')).setEncoding(payload);
    });

    after(() => MongoClient.connect.restore());

    describe('when the name is missing', () => {
      before(async () => {
        response = await chai.request(app).post('/users').send(payload);
      });

      it('should return status 201', async () => {
        expect(response).to.have.status(201);
      });

      it('should return an object in the body', () => {
        expect(response.body).to.be.an('object');
      });

      it('should contain the key user', () => {
        expect(response.body).to.include.all.keys('user');
      });

      it('the key user should contain the user data', () => {
        expect(response.body.user).to.be.an('object');
        expect(response.body.user).to.include.all.keys('name', 'email', 'password', '_id', 'role');
      });
    });
  });
});
