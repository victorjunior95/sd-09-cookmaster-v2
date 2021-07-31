const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../api/app');
const connection = require('./connection');
const { MongoClient } = require('mongodb');

const { expect } = chai;

describe('POST /users', () => {
  describe('invalid user info', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/users').send({});
    });

    it('have to return status 400', () =>
      expect(response).to.have.status(400));

    it('must have to be an object', () =>
      expect(response.body).to.be.an('object'));

    it('must have to return a message', () =>
      expect(response.body).to.have.a.property('message'));

    it('have to return error message', () =>
      expect(response.body.message).to.be.equal('Invalid entries. Try again.'));
  });

  describe('user info ok', () => {
    const fakeUser = { name: 'fakeUser', email: 'fakeUser@email.com', password: 'fakepass' };
    let connetion;
    let response;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      response = await chai.request(app).post('/users').send(fakeUser);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connetion.db('Cookmaster').collection('users').deleteOne({ username: 'fakeUser' });
    });

    it('have to return status 201', () =>
      expect(response).to.have.status(201));

    it('must have to be an object', () =>
      expect(response.body).to.be.an('object'));

    it('must have prop user', () =>
      expect(response.body).to.have.property('user'));

    it('user must have props name, email and role', () =>
      expect(response.body.user).to.include.all.keys('name', 'email', 'role'));
  });
});

describe('POST /login', () => {
  describe('invalid login info', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login').send({});
    });

    it('have to return status 401', () =>
      expect(response).to.have.status(401));

    it('must have to be an object', () =>
      expect(response.body).to.be.an('object'));

    it('have to return message', () =>
      expect(response.body).to.have.a.property('message'));

    it('have to return error message', () =>
      expect(response.body.message).to.be.equal('All fields must be filled'));
  });

  describe('username doenst exists', () => {
    const jhonDoe = { name: 'jhonDoe', email: 'jhonDoe@email.com', password: 'unexists' };
    let connetion;
    let response;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      response = await chai.request(app).post('/login').send(jhonDoe);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('have to return status 401', () =>
      expect(response).to.have.status(401));

    it('must have to be an object', () =>
      expect(response.body).to.be.an('object'));

    it('have to return a message', () =>
      expect(response.body).to.have.property('message'));

    it('have to return error message', () =>
      expect(response.body.message).to.equal('Incorrect username or password'));
  });

  describe('all login info ok', () => {
    const fakeUser = { name: 'fakeUser', email: 'fakeUser@email.com', password: 'fakepass' };
    let connetion;
    let response;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      await connetion.db('Cookmaster').collection('users').insertOne(fakeUser);

      response = await chai.request(app).post('/login').send(fakeUser);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connetion.db('Cookmaster').collection('users').deleteOne({ username: 'fakeUser' });
    });

    it('have to return status 200', () =>
      expect(response).to.have.status(200));

    it('must have to be an object', () =>
      expect(response.body).to.be.an('object'));

    it('must have prop token', () =>
      expect(response.body).to.have.property('token'));

    it('token is not empty', () =>
      expect(response.body.token).to.not.be.empty);
  });
});