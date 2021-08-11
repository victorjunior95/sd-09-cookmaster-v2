const chai = require('chai');
const sinon = require('sinon');
const app = require('../api/app');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('Quando nome, email e/ou password não são informados:', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/users').send({});
    });

    it('Retorna um status HTTP 400.', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto no body.', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto de resposta possui uma propriedade chamada "message".', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('A propriedade "message" possui uma mensagem de erro adequada.', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('Quando o email já existe:', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({ name: 'user', email: 'email@email.com', password: '1234' });

      response = await chai.request(app).post('/users')
        .send({ name: 'user2', email: 'email@email.com', password: '1234' });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users')
        .findOne({ email: 'email@email.com' });
    });

    it('Retorna um status HTTP 409.', () => {
      expect(response).to.have.status(409);
    });

    it('Retorna um objeto no body.', () => {
      expect(response.body).to.be.an('object');
    });

    it('Retorna um objeto com a propriedade "message".', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('A propriedade "message" não é vazia.', () => {
      expect(response.body.message).to.not.be.empty;
    });

    it('A propriedade "message" possui uma mensagem de erro adequada.', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });

  describe('Quando o cadastro é realizado com sucesso:', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(app).post('/users')
        .send({ name: 'novo usuário', email: 'email@ok.com', password: '1234' });
    });

    after(async () => { MongoClient.connect.restore() });

    it('Retorna um status HTTP 201.', () => {
      expect(response).to.have.status(201);
    });

    it('Retorna um objeto com a propriedade "user".', () => {
      expect(response.body).to.have.a.property('user');
    });

    it('A propriedade "user" não é vazia.', () => {
      expect(response.body.user).to.not.be.empty;
    });
  });
});
