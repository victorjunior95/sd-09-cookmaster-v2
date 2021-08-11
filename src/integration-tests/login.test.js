const chai = require('chai');
const sinon = require('sinon');
const app = require('../api/app');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  describe('Quando email e/ou password não são informados:', () => {

    let response;

    before(async () => {
      response = await chai
        .request(app)
        .post('/login')
        .send({});
    });

    it('Retorna um status HTTP 401.', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto no body.', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto de resposta possui uma propriedade chamada "message".', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('A propriedade "message" possui uma mensagem de erro adequada.', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('Quando o email não existe no banco:', () => {

    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'email@fake.com',
          password: '1234'
        });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('Retorna um status HTTP 401.', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto no body.', () => {
      expect(response.body).to.be.an('object');
    });

    it('O objeto de resposta possui uma propriedade "message".', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('A propriedade "message" possui uma mensagem de erro adequada.', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });

  describe('Quando o login é realizado com sucesso:', () => {

    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      await connectionMock
        .db('Cookmaster')
        .collection('users')
        .insertOne({
          email: 'email@ok.com',
          password: '1234'
        });

      response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'email@ok.com',
          password: '1234'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock
        .db('Cookmaster')
        .collection('users')
        .deleteOne({
          email: 'email@ok.com',
        });
    });

    it('Retorna um status HTTP 200.', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna um objeto com a propriedade "token".', () => {
      expect(response.body).to.have.a.property('token');
    });

    it('A propriedade "token" não é vazia.', () => {
      expect(response.body.token).to.not.be.empty;
    });
  });
});
