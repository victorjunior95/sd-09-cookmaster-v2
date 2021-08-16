const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { expect } = chai;

let connectionMock;

chai.use(chaiHttp);

describe('POST /users/admin', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When an admin is created with success', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleAdmin',
        email: 'admin@example.com',
        password: 'adminadmin',
        role: 'admin'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'admin@example.com',
          password: 'adminadmin'
        })
        .then((res) => res.body.token);

      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send({
          name: 'string',
          email: 'string',
          password: 'string'
        });
    });

    it('should return a 201 status code', () => {
      expect(response).to.have.status(201);
    });

    it('should have a body in the response', () => {
      expect(response.body).to.be.an('object');
    });

    it('should have a property "user" in the response body', () => {
      expect(response.body).to.have.property('user');
    });
  });

  describe('When no auth token is send', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', '')
        .send({
          name: 'string',
          email: 'string',
          password: 'string'
        });
    });

    it('should return a 403 status code', () => {
      expect(response).to.have.status(403);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "Only admins can register new admins"', () => {
      expect(response.body.message).to.be.equals('Only admins can register new admins');
    });
  });

  describe('When the role is not "admin"', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleUser',
        email: 'user@example.com',
        password: 'useruser',
        role: 'user'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'user@example.com',
          password: 'useruser'
        })
        .then((res) => res.body.token);

      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send({
          name: 'string',
          email: 'string',
          password: 'string'
        });
    });

    it('should return a 403 status code', () => {
      expect(response).to.have.status(403);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "Only admins can register new admins"', () => {
      expect(response.body.message).to.be.equals('Only admins can register new admins');
    });
  });
});

describe('POST /users', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When user is created with success', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'exampleName',
          email: 'exampleSuccess@example.com',
          password: 'examplePassword'
        });
    });

    it('should return a 201 status code', () => {
      expect(response).to.have.status(201);
    });

    it('should have a body in the response', () => {
      expect(response.body).to.be.an('object');
    });

    it('should have a property "user" in the response body', () => {
      expect(response.body).to.have.property('user');
    });
  });

  describe('When user is not created with success because of invaid email format', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'exampleName',
          email: 'example@',
          password: 'examplePassword'
        });
    });

    it('should return a 400 status code', () => {
      expect(response).to.have.status(400);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('When an email already exists and the user is not created', async () => {

    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'exampleName',
          email: 'example@example.com',
          password: 'examplePassword'
        });
    });

    it('should return a 409 status code', () => {
      expect(response).to.have.status(409);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "Email already registered"', () => {
      expect(response.body.message).to.be.equals('Email already registered');
    });
  });
});

describe('POST /login', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When user is logged in with success', async () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'examplePassword'
        });
    });

    it('should return a 200 status code', () => {
      expect(response).to.have.status(200);
    });

    it('should have a body in the response', () => {
      expect(response.body).to.be.an('object');
    });

    it('should have a property "token" in the response body', () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('When no password is send in the request', async () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: ''
        });
    });

    it('should return a 401 status code', () => {
      expect(response).to.have.status(401);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });

  describe('When the password is is not correct', async () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'Passwordexample'
        });
    });

    it('should return a 401 status code', () => {
      expect(response).to.have.status(401);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });
});
