const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../api/app');
const getConnection = require('./connectionMock');
const { MongoClient } = require('mongodb');

const { expect } = chai;

describe('POST /users', () => {
  describe('when invalid username, email or password', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/users').send({});
    });

    it('returns HTTP status 400', () =>
      expect(response).to.have.status(400));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

    it('returns a `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('returns an error message', () =>
      expect(response.body.message).to.be.equal('Invalid entries. Try again.'));
  });

  describe('when user is created successfully', () => {
    const userOk = { name: 'user-ok', email: 'userok@email.com', password: 'password-ok' };
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(app).post('/users').send(userOk);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ username: 'user-ok' });
    });

    it('returns HTTP status 201', () =>
      expect(response).to.have.status(201));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

    it('returns a `user`', () =>
      expect(response.body).to.have.property('user'));

    it('`user` has properties "name", "email" and "role"', () =>
      expect(response.body.user).to.include.all.keys('name', 'email', 'role'));
  });
});

describe('POST /login', () => {
  describe('when invalid username, email or password', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login').send({});
    });

    it('returns HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

    it('returns a `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('returns an error message', () =>
      expect(response.body.message).to.be.equal('All fields must be filled'));
  });

  describe('when username does not exists', () => {
    const userFake = { name: 'user-fake', email: 'user-fake@email.com', password: 'password-fake' };
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(app).post('/login').send(userFake);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('returns HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

    it('returns a `message`', () =>
      expect(response.body).to.have.property('message'));

    it('returns an error message', () =>
      expect(response.body.message).to.equal('Incorrect username or password'));
  });

  describe('when successful login', () => {
    const userOk = { name: 'user-ok', email: 'user-ok@email.com', password: 'password-ok' };
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(userOk);

      response = await chai.request(app).post('/login').send(userOk);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ username: 'user-ok' });
    });

    it('returns HTTP status 200', () =>
      expect(response).to.have.status(200));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

    it('returns a `token`', () =>
      expect(response.body).to.have.property('token'));

    it('`token` is not empty', () =>
      expect(response.body.token).to.not.be.empty);
  });
});
