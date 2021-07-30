const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../api/app');
const { getConnection } = require('./connection');
const { MongoClient } = require('mongodb');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing route POST /users', () => {
  describe('In case of success', () => {
    let response;
    before(async () => {
      const connection = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connection);
      response = await chai.request(server)
        .post('/users')
        .send({ name: 'jack', email: 'jack@email.com', password: 'jack' });
    });
    after(async () => {
      MongoClient.connect.restore();
    });
  
    it('should send a 201 status code', () => {
      expect(response).to.have.status(201);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "user" property', () => {
      expect(response.body).to.have.property('user');
    });
    it('should have the right properties containing the new user information', () => {
      expect(response.body.user).to.have.keys('_id', 'name', 'email', 'role');
    });
  });

  describe('In case the "name" property be missing', () => {
    let response;
    before(async () => {
      const connection = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connection);
      response = await chai.request(server)
        .post('/users')
        .send({ email: 'jack@email.com', password: 'jack' });
    });
    after(async () => {
      MongoClient.connect.restore();
    });
  
    it('should send a 400 status code', () => {
      expect(response).to.have.status(400);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should contain an error message', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('In case the "email" property be missing', () => {
    let response;
    before(async () => {
      const connection = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connection);
      response = await chai.request(server)
        .post('/users')
        .send({ name: 'jack', password: 'jack' });
    });
    after(async () => {
      MongoClient.connect.restore();
    });
  
    it('should send a 400 status code', () => {
      expect(response).to.have.status(400);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should contain an error message', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('In case the "email" property is invalid', () => {
    let response;
    before(async () => {
      const connection = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connection);
      response = await chai.request(server)
        .post('/users')
        .send({ name: 'jack', email: 'jackemail.com', password: 'jack' });
    });
    after(async () => {
      MongoClient.connect.restore();
    });
  
    it('should send a 400 status code', () => {
      expect(response).to.have.status(400);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should contain an error message', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('In case the "password" property is missing', () => {
    let response;
    before(async () => {
      const connection = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connection);
      response = await chai.request(server)
        .post('/users')
        .send({ name: 'jack', email: 'jack@email.com' });
    });
    after(async () => {
      MongoClient.connect.restore();
    });
  
    it('should send a 400 status code', () => {
      expect(response).to.have.status(400);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should contain an error message', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('In case the user already exists', () => {
    let connection;
    let response;
    before(async () => {
      connection = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connection);
      await connection.db('Cookmaster').collection('users')
        .insertOne({ name: 'jack', email: 'jack@email.com', password: 'jack'});
      response = await chai.request(server)
        .post('/users')
        .send({ name: 'jack', email: 'jack@email.com' });
    });
    after(async () => {
      MongoClient.connect.restore();
      await connection.db('Cookmaster').collection('users').deleteOne({ email: 'jack@email.com' });
    });
  
    it('should send a 409 status code', () => {
      expect(response).to.have.status(409);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should contain an error message', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });
});

describe('Testing route POST /login', () => {
  describe('In case of success', () => {
    let response;
    before(async () => {
      const connection = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connection);
      response = await chai.request(server)
        .post('/users')
        .send({ name: 'mia', email: 'mia@email.com', password: 'mia' });
    });
    after(async () => {
      MongoClient.connect.restore();
    });
  
    it('should send a 200 status code', () => {
      expect(response).to.have.status(200);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "token" property', () => {
      expect(response.body).to.have.property('token');
    });
    it('should be a string', () => {
      expect(response.body.user).to.be.a('string');
    });
  });

  describe('In case the "name" property is invalid', () => {
    let response;
    before(async () => {
      const connection = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connection);
      response = await chai.request(server)
        .post('/users')
        .send({ email: 'mia@email.com', password: 'mia' });
    });
    after(async () => {
      MongoClient.connect.restore();
    });
  
    it('should send a 401 status code', () => {
      expect(response).to.have.status(401);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('token');
    });
    it('should be an error message', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });

  describe('In case the "email" property is missing', () => {
    let response;
    before(async () => {
      const connection = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connection);
      response = await chai.request(server)
        .post('/users')
        .send({ password: 'mia' });
    });
    after(async () => {
      MongoClient.connect.restore();
    });
  
    it('should send a 401 status code', () => {
      expect(response).to.have.status(401);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('token');
    });
    it('should be an error message', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('In case the "password" property is missing', () => {
    let response;
    before(async () => {
      const connection = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connection);
      response = await chai.request(server)
        .post('/users')
        .send({ email: 'mia@email.com' });
    });
    after(async () => {
      MongoClient.connect.restore();
    });
  
    it('should send a 401 status code', () => {
      expect(response).to.have.status(401);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('token');
    });
    it('should be an error message', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('In case the "password" property is invalid', () => {
    let response;
    before(async () => {
      const connection = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connection);
      response = await chai.request(server)
        .post('/users')
        .send({ email: 'mia@email.com', password: 'jack'});
    });
    after(async () => {
      MongoClient.connect.restore();
    });
  
    it('should send a 401 status code', () => {
      expect(response).to.have.status(401);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('token');
    });
    it('should be an error message', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });
});
