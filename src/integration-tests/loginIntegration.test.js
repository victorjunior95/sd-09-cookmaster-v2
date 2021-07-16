const chai = require('chai');
const sinon = require('sinon');
const app = require('../api/app');
const { getConnection } = require('./connectionMock');

const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota /login', () => {
  describe('Quando fazemos uma requisição malsucedida', () => {
    describe('Quando não informamos email ou password', () => {
      let response;

      before( async () => {
        response = await chai.request(app).post('/login')
          .send({});
      });

      it('deve retornar um codigo HTTP 401', () =>{
        expect(response).to.have.status(401);
      });

      it('deve retornar um objeto no body com a key "message"', () => {
        expect(response.body).to.be.an('object').to.have.property('message');
      });

      it('deve retornar a mensagem de erro correta', () => {
        expect(response.body.message).to.be.equal('All fields must be filled');
      });
    });
    describe('Quando não encontramos o usuário no DB', () => {
      let connectionMock;
      let response;

      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        response = await chai.request(app).post('/login')
          .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });
      });

      after(async () => {
        MongoClient.connect.restore();
      });

      it('deve retornar um codigo HTTP 401', () =>{
        expect(response).to.have.status(401);
      });

      it('deve retornar um objeto no body com a key "message"', () => {
        expect(response.body).to.be.an('object').to.have.property('message');
      });

      it('deve retornar a mensagem de erro correta', () => {
        expect(response.body.message).to.be.equal('Incorrect username or password');
      });
    });
    describe('Quando a senha não bate com a do usuário encontrado', () => {
      let connectionMock;
      let response;

      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users')
          .insertOne({ name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2020' });

        response = await chai.request(app).post('/login')
          .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteOne({ email: 'yoneda@trybe.com' });
      });

      it('deve retornar um codigo HTTP 401', () =>{
        expect(response).to.have.status(401);
      });

      it('deve retornar um objeto no body com a key "message"', () => {
        expect(response.body).to.be.an('object').to.have.property('message');
      });

      it('deve retornar a mensagem de erro correta', () => {
        expect(response.body.message).to.be.equal('Incorrect username or password');
      });
    });
  });
  describe('Quando fazemos o login con sucesso', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({ name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021' });

      response = await chai.request(app).post('/login')
        .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ email: 'yoneda@trybe.com' });
    });

    it('deve retornar um codigo HTTP 200', () =>{
      expect(response).to.have.status(200);
    });

    it('deve retornar um objeto no body com um token', () => {
      expect(response.body).to.be.an('object').to.have.property('token');
    });

    it('deve retornar a um token string', () => {
      expect(response.body.token).to.be.a('string');
    });
  });
});
