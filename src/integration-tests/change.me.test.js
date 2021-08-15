const chai = require('chai'); // ok
const sinon = require('sinon');
const server = require('../api/ap'); // ok
const connection = require('./mongoConnectionMock');
const chaiHttp = require('chai-http'); // ok

const { expect } = chai; // ok
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const DBServer = new MongoMemoryServer();

chai.use(chaiHttp); // ok
const connection = () => DBServer.getUri().then((mock) => MongoClient.connect(mock, OPTIONS));

describe('POST /users', () => {
  describe('usuario cadastrado com sucesso', () => {
    let res;
    let conn;

    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);

      res = await chai.request(server).post('/users').send({
        name: 'user',
        email: 'user@mail.com',
        password: '123456'
      });
    });

    after(async () => {
      MongoClient.connect.restore();
      await conn.db('Cookmaster').collection('users').deleteMany({});
    });

    it('retorna o status 201', () =>
      expect(res).to.have.status(201));

    it('retorna um objeto', () =>
      expect(res.body).to.be.an('object'));

    it('possui a propriedade "user"', () =>
      expect(res.body).to.have.property('user'));
  });
});
