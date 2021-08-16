const chai = require('chai');
const sinon = require('sinon');
const chaihttp = require('chai-http');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaihttp);
const { expect } = chai;

const usersToPost = {
  user0: { name: '', password: 123456, email: 'johndoe@email.com' },
  user1: { name: 'John Doe', password: '', email: 'johndoe@email.com' },
  user2: { name: 'John Doe', password: 1234, email: 'johndoe@email.com' },
  user3: { name: 'John Doe', password: 12345678, email: '' },
  user4: { name: 'John Doe', password: 12345678, email: 'johndoe@email@.com' },
  user5: { name: 'John Doe', password: 12345678, email: 'johndoe@email.com' },
}

describe('/POST - ADD ONE NEW USER; the body of request should have "name", "email", "password"', () => {
  describe('When the request was rejected, with no correct object on the body of request', () => {
    describe('The body havent property name', () => {
      let response;
      before(async () => {
        response = await chai.request(server).post('/users/').send(usersToPost.user0);
      });

      it('Should return status 400', () => {
        expect(response).to.have.status(400);
      });

      it('Should return an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('Should have the error message, with property "message"', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });


    describe('The body havent property password', () => {
      let response;
      before(async () => {
        response = await chai.request(server).post('/users/').send(usersToPost.user1);
      });

      it('Should return status 400', () => {
        expect(response).to.have.status(400);
      });

      it('Should return an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('Should have the error message, with property "message"', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('The body havent property password with at least five characters', () => {
      let response;
      before(async () => {
        response = await chai.request(server).post('/users/').send(usersToPost.user2);
      });

      it('Should return status 400', () => {
        expect(response).to.have.status(400);
      });

      it('Should return an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('Should have the error message, with property "message"', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('The body havent property email', () => {
      let response;
      before(async () => {
        response = await chai.request(server).post('/users/').send(usersToPost.user3);
      });

      it('Should return status 400', () => {
        expect(response).to.have.status(400);
      });

      it('Should return an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('Should have the error message, with property "message"', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('The body property email should be a valid expression', () => {
      let response;
      before(async () => {
        response = await chai.request(server).post('/users/').send(usersToPost.user4);
      });

      it('Should return status 400', () => {
        expect(response).to.have.status(400);
      });

      it('Should return an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('Should have the error message, with property "message"', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('The body property email cant be registered twice', () => {
      let connectionMock;
      let response;
      before(async () => {
        const DBServer = await MongoMemoryServer.create();
        const URLMock = DBServer.getUri();
        const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
        connectionMock = await MongoClient.connect(URLMock, OPTIONS);
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users').insertOne(usersToPost.user5);
        response = await chai.request(server).post('/users/').send(usersToPost.user5);
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      });

      it('Should return status 409', () => {
        expect(response).to.have.status(409);
      });

      it('Should return an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('Should have the error message, with property "message"', () => {
        expect(response.body.message).to.be.equal('Email already registered');
      });
    });
  });

  describe('When the request was accepted ', () => {
    describe('New user was successfully registered ', () => {
      let connectionMock;
      let response;
      before(async () => {
        const DBServer = await MongoMemoryServer.create();
        const URLMock = DBServer.getUri();
        const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
        connectionMock = await MongoClient.connect(URLMock, OPTIONS);
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        response = await chai.request(server).post('/users/').send(usersToPost.user5);
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      });

      it('Should return status 201', () => {
        expect(response).to.have.status(201);
      });

      it('Should return an object', () => {
        expect(response.body).to.be.an('object');
      });

      it('Should have the property "user", with "name", "email", "role", "_id"', () => {
        expect(response.body.user).to.be.an('object');
        expect(response.body.user.name).to.be.equal('John Doe');
        expect(response.body.user.email).to.be.equal('johndoe@email.com');
        expect(response.body.user.role).to.be.equal('user');
        expect(response.body.user._id).to.exist;
        expect(response.body.user._id.length).to.be.equal(24);
      });
    });
  });
});