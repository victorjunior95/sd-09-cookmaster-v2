const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const connection = require('./mock/connectionMock');

const { expect } = chai;
chai.use(chaiHttp);

const VALID_LOGIN = {
  email: 'mockuseremail@email.com',
  password: 'mockuserpassword',
};

const INVALID_LOGIN = {
  email: 'invalidmockuseremail@email.com',
  password: 'mockuserpassword',
};

let connectionMock;

describe('Testa o caminho "/login"', () => {
  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('1 - Testa um login válido', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany({});
      await usersCollection.insertOne(VALID_LOGIN);

      response = await chai.request(server).post('/login').send(VALID_LOGIN);
    });

    it('1 - retorna com código de estatus "200"', () => {
      expect(response).to.have.status(200);
    });

    it('2 - retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - retorna um body com a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });

    it('4 - o campo "token" não está vazio', () => {
      expect(response.body.token).to.not.be.empty;
    });
  });

  describe('2 - Testa um login sem email', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany({});
      await usersCollection.insertOne(VALID_LOGIN);

      response = await chai.request(server).post('/login').send({ password: 'password' });
    });

    it('1 - retorna com código de estatus "401"', () => {
      expect(response).to.have.status(401);
    });

    it('2 - retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - a propriedade "message" tem o valor "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('3 - Testa um login sem senha', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany({});
      await usersCollection.insertOne(VALID_LOGIN);

      response = await chai
        .request(server)
        .post('/login')
        .send({ email: 'email@email.com' });
    });

    it('1 - retorna com código de estatus "401"', () => {
      expect(response).to.have.status(401);
    });

    it('2 - retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - a propriedade "message" tem o valor "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('4 - Testa um login com email inválido', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany({});
      await usersCollection.insertOne(VALID_LOGIN);

      response = await chai.request(server).post('/login').send(INVALID_LOGIN);
    });

    it('1 - retorna com código de estatus "401"', () => {
      expect(response).to.have.status(401);
    });

    it('2 - retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - a propriedade "message" tem o valor "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });

  describe('5 - Testa um login com senha inválida', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany({});
      await usersCollection.insertOne(VALID_LOGIN);

      response = await chai
        .request(server)
        .post('/login')
        .send({ ...VALID_LOGIN, password: 1234 });
    });

    it('1 - retorna com código de estatus "401"', () => {
      expect(response).to.have.status(401);
    });

    it('2 - retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('3 - objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('4 - a propriedade "message" tem o valor "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });
});