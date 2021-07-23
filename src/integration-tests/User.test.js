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
  describe('3 - When email is not informed', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      resp = await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
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

describe('POST /login', () => {
  describe('1 - When a successful login occurs', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@email.com',
          password: 'test@123',
        });

      resp = await chai.request(server)
        .post('/login')
        .send({
          email: 'test@email.com',
          password: 'test@123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 200', () => {
      expect(resp).to.have.status(200);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns an object with property "token"', () => {
      expect(resp.body).to.have.property('token');
    });

    it('Returns an object with a string as a value', () => {
      expect(resp.body.token).to.be.an('string');
    });

  });
  describe('2 - When email is not informed', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@email.com',
          password: 'test@123',
        });

      resp = await chai.request(server)
        .post('/login')
        .send({
          password: 'test@123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 401', () => {
      expect(resp).to.have.status(401);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns an object with property "message"', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns an object with value "All fields must be filled"', () => {
      expect(resp.body.message).to.be.equals('All fields must be filled');
    });

  });
  describe('3 - When password is not informed', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@email.com',
          password: 'test@123',
        });

      resp = await chai.request(server)
        .post('/login')
        .send({
          email: 'test@email.com',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 401', () => {
      expect(resp).to.have.status(401);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns an object with property "message"', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns an object with value "All fields must be filled"', () => {
      expect(resp.body.message).to.be.equals('All fields must be filled');
    });

  });
  describe('4 - When invalid email is entered', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@email.com',
          password: 'test@123',
        });

      resp = await chai.request(server)
        .post('/login')
        .send({
          email: 'wrong@email.com',
          password: 'test@123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 401', () => {
      expect(resp).to.have.status(401);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns an object with property "message"', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns an object with value "Incorrect password or password"', () => {
      expect(resp.body.message).to.be.equals('Incorrect username or password');
    });

  });
  describe('5 - When invalid password is entered', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@email.com',
          password: 'test@123',
        });

      resp = await chai.request(server)
        .post('/login')
        .send({
          email: 'test@email.com',
          password: 'wrong@123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 401', () => {
      expect(resp).to.have.status(401);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns an object with property "message"', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns an object with value "Incorrect username or password"', () => {
      expect(resp.body.message).to.be.equals('Incorrect username or password');
    });

  });
});
