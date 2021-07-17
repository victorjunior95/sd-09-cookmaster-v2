const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

describe('LOGIN', () => {
  describe('POST /login', () => {
    describe('SUCESSO', () => {
      let response;
      let connectionMock;
      const DBServer = new MongoMemoryServer();

      before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users').insertOne({
          name: 'name-test-success',
          email: 'testsuccess@email.com',
          password: 'password-test-success',
        })

        response = await chai.request(app).post('/login').send({
          email: 'testsuccess@email.com',
          password: 'password-test-success',
        });
      });

      after(async () => {
        connectionMock
          .db('Cookmaster')
          .collection('users')
          .deleteOne({ name: 'name-test-success' });

        MongoClient.connect.restore();
        await DBServer.stop();
      });

      it('retorna o código 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto que possui a chave "token"', () => {
        expect(response.body).to.be.an('object').which.includes.a.key('token');
      });
    });

    describe('FALHA', () => {
      let connectionMock;
      const DBServer = new MongoMemoryServer();
      const MISSING_ENTRY_MESSAGE = 'All fields must be filled';

      before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
      });

      describe('Quando o campo "email" não é inserido', () => {
        let response;
        before(async () => {
          response = await chai.request(app).post('/login').send({
            password: 'password-test-fail',
          });
        });

        it('retorna o código 401', () => {
          expect(response).to.have.status(401);
        });

        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('o objeto retornado deve ter a chave "message"', () => {
          expect(response.body).to.include.a.key('message');
        });

        it('a chave "message" deve ter o valor esperado', () => {
          expect(response.body.message).to.be.equal(MISSING_ENTRY_MESSAGE);
        });
      });

      describe('Quando o campo "email" não é válido', () => {
        let response;
        before(async () => {
          response = await chai.request(app).post('/login').send({
            email: 'testfail@',
            password: 'password-test-fail',
          });
        });

        it('retorna o código 401', () => {
          expect(response).to.have.status(401);
        });

        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('o objeto retornado deve ter a chave "message"', () => {
          expect(response.body).to.include.a.key('message');
        });

        it('a chave "message" deve ter o valor esperado', () => {
          expect(response.body.message).to.be.equal('Incorrect username or password');
        });
      });

      describe('Quando o campo "password" não é inserido', () => {
        let response;
        before(async () => {
          response = await chai.request(app).post('/login').send({
            email: 'testsuccess@email.com',
          });
        });

        it('retorna o código 401', () => {
          expect(response).to.have.status(401);
        });

        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('o objeto retornado deve ter a chave "message"', () => {
          expect(response.body).to.include.a.key('message');
        });

        it('a chave "message" deve ter o valor esperado', () => {
          expect(response.body.message).to.be.equal(MISSING_ENTRY_MESSAGE);
        });
      });
    });
  });
});
