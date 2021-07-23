const { getConnection, MongoClient, DBServer } = require('./connectionMock');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('1 - When a user is created successfully', () => {
    let resp;
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      resp = await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@email.com',
          password: 'test@123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 201', () => {
      expect(resp).to.have.status(201);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns a object with property user', () => {
      expect(resp.body).to.have.key('user');
    });

    it('Returns an object as value', () => {
      expect(resp.body.user).to.be.an('object');
    });

    it('Returns an object as value with specific property', () => {
      expect(resp.body.user).to.have.property('_id');
      expect(resp.body.user).to.have.property('name');
      expect(resp.body.user).to.have.property('email');
      expect(resp.body.user).to.have.property('role');
    });

    it('Returns an object as value with specific values', () => {
      expect(resp.body.user.name).to.be.equal('test');
      expect(resp.body.user.email).to.be.equal('test@email.com');
      expect(resp.body.user.role).to.be.equal('user');
    });

  });

  describe('2 - When name is not informed', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      resp = await chai.request(server)
        .post('/users')
        .send({
          name: '',
          email: 'test@email.com',
          password: 'test@123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 400', () => {
      expect(resp).to.have.status(400);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns a object with key message', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns a object with value "Invalid entries. Try again."', () => {
      expect(resp.body.message).to.be.equals('Invalid entries. Try again.');
    });

  });

  describe('3 - When a mandatory email is not informed', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      resp = await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: '',
          password: 'test@123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 400', () => {
      expect(resp).to.have.status(400);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns a object with key message', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns a object with value "Invalid entries. Try again."', () => {
      expect(resp.body.message).to.be.equals('Invalid entries. Try again.');
    });

  });

  describe('4 - When a password is not informed', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      resp = await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@email.com',
          password: '',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 400', () => {
      expect(resp).to.have.status(400);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns a object with key message', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns a object with value "Invalid entries. Try again."', () => {
      expect(resp.body.message).to.be.equals('Invalid entries. Try again.');
    });

  });

  describe('5 - When an invalid email is entered', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      resp = await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test',
          password: 'test@123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 400', () => {
      expect(resp).to.have.status(400);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns a object with key message', () => {
      expect(resp.body).to.have.property('message')
    });

    it('Returns a object with value "Invalid entries. Try again."', () => {
      expect(resp.body.message).to.be.equals('Invalid entries. Try again.');
    });

  });

  describe('6 - When email is not unique', () => {
    
    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@test.com',
          password: 'test@123',
        });

      resp = await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@test.com',
          password: 'test@123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 409', () => {
      expect(resp).to.have.status(409);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object')
    });

    it('Returns a object with key message', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns a object with value "Email already registered."', () => {
      expect(resp.body.message).to.be.equals('Email already registered');
    });

  });
});
