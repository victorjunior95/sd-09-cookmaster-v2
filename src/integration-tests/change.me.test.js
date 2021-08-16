const chai = require('chai');
const sinon = require('sinon');
const server = require('../api/app');
const chaiHttp = require('chai-http');

const { expect } = chai;
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const DBServer = new MongoMemoryServer();

chai.use(chaiHttp);
const connection = () => DBServer.getUri().then((mock) => MongoClient.connect(mock, OPTIONS));

describe('POST /users', () => {
  describe('Cadastrado com sucesso', () => {
    let res;
    let conn;

    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);

      res = await chai.request(server).post('/users').send({
        name: 'user',
        email: 'user@email.com',
        password: '123456'
      });
    });

    after(async () => {
      await conn.db('Cookmaster').collection('users').deleteMany({});
    });

    it('Retorna o status 201', () =>
      expect(res).to.have.status(201));

    it('Retorna um objeto', () =>
      expect(res.body).to.be.an('object'));

    it('Possui a propriedade "user"', () =>
      expect(res.body).to.have.property('user'));
  });

  describe('Erro no cadastro', () => {
    let res;

    before(async () => {
      res = await chai.request(server).post('/users').send({
        name: '',
        password: ''
      });
    });

    it('retorna status 400', () =>
      expect(res).to.have.status(400));

    it('retorna um objeto', () =>
      expect(res.body).to.be.an('object'));

    it('tem a propriedade "message"', () =>
      expect(res.body).to.have.a.property('message'));
  });
});

describe('POST /login', () => {
  describe('Login realizado com sucesso', () => {
    let res;
    let conn;

    before(async () => {
      conn = await connection();

      await conn.db('Cookmaster').collection('users').insertOne({
        name: 'user',
        email: 'user@email.com',
        password: '123456',
        role: 'user'
      });

      res = await chai.request(server).post('/login').send({
        email: 'user@email.com',
        password: '123456'
      });
    });

    after(async () => {
      await conn.db('Cookmaster').collection('users').deleteMany({});
    });

    it('Retorna status 200', () =>
      expect(res).to.have.status(200));

    it('Retorna um objeto', () =>
      expect(res.body).to.be.an('object'));

    it('Possui a propriedade "token"', () =>
      expect(res.body).to.have.property('token'));
  });

  describe('Login error', () => {
    let res;

    before(async () => {
      res = await chai.request(server).post('/login').send({
        email: 'us',
        password: '12'
      });
    });

    it('Retorna status 401', () =>
      expect(res).to.have.status(401));

    it('Retorna um objeto', () =>
      expect(res.body).to.be.an('object'));

    it('Possui a propriedade "message"', () =>
      expect(res.body).to.have.a.property('message'));
  });
});

describe('POST /recipes', () => {
  describe('Token validado com sucesso', () => {
    let res;
    let conn;

    before(async () => {
      conn = await connection();

      await conn.db('Cookmaster').collection('users').insertOne({
        name: 'admin',
        email: 'admin@email.com',
        password: 'admin123',
        role: 'admin'
      });

      const token = await chai.request(server).post('/login')
      .send({ email: 'admin@email.com', password: 'admin123' }).then((res) => res.text);

      res = await chai.request(server).post('/recipes').send({
        name: "recipe",
        ingredients: "ingredientes...",
        preparation: "preparation...",
      }).set('authorization', token);
    });

    after(async () => {
      await conn.db('Cookmaster').collection('users').deleteMany({});
    });

    it('Retorna o status 201', () =>
      expect(res).to.have.status(401));

    it('Retorna um objeto', () =>
      expect(res.body).to.be.an('object'));

    it('Possui a propriedade "recipe"', () =>
      expect(res.body).to.have.property('message'));
  });

  describe('Token inválido', () => {
    let res;

    before(async () => {
      res = await chai.request(server).post('/recipes').send({
        name: 'us',
        password: '12'
      });
    });

    it('Retorna status 401', () =>
      expect(res).to.have.status(401));

    it('Retorna um objeto', () =>
      expect(res.body).to.be.an('object'));

    it('Tem a propriedade "message"', () =>
      expect(res.body).to.have.a.property('message'));
  });
});
