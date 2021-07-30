const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../api/app');
const getConnection = require('./connectionMock');
const { MongoClient } = require('mongodb');

const { expect } = chai;

describe('POST /users', () => {
  describe('quando é enviado username, email or password inválidos', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/users').send({});
    });

    it('retorna um HTTP status 400', () =>
      expect(response).to.have.status(400));

    it('retorna um object', () =>
      expect(response.body).to.be.an('object'));

    it('retorna uma `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('retorna uma mensagem error', () =>
      expect(response.body.message).to.be.equal('Invalid entries. Try again.'));
  });

  describe('quando um usuário é criado com sucesso', () => {
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

    it('retorna um HTTP status 201', () =>
      expect(response).to.have.status(201));

    it('retorna um object', () =>
      expect(response.body).to.be.an('object'));

    it('retorna um`user`', () =>
      expect(response.body).to.have.property('user'));

    it('`user` tem as chaves "name", "email" and "role"', () =>
      expect(response.body.user).to.include.all.keys('name', 'email', 'role'));
  });
});

describe('POST /login', () => {
  describe('quando o login é inválido', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login').send({});
    });

    it('retorna um HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('retorna um object', () =>
      expect(response.body).to.be.an('object'));

    it('retorna uma `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('retorna uma mensagem error', () =>
      expect(response.body.message).to.be.equal('All fields must be filled'));
  });

  describe('quando o userName não existe', () => {
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

    it('retorna um HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('retorna um object', () =>
      expect(response.body).to.be.an('object'));

    it('retorna uma `message`', () =>
      expect(response.body).to.have.property('message'));

    it('retorna uma mensagem error', () =>
      expect(response.body.message).to.equal('Incorrect username or password'));
  });

  describe('quando o login é feito com sucesso', () => {
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

    it('retorna um HTTP status 200', () =>
      expect(response).to.have.status(200));

    it('retorna um object', () =>
      expect(response.body).to.be.an('object'));

    it('retorna um `token`', () =>
      expect(response.body).to.have.property('token'));

    it('`token` não é vazio', () =>
      expect(response.body.token).to.not.be.empty);
  });
});