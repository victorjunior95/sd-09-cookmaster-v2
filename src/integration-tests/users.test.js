const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

describe('USERS', () => {
  describe('POST /users', () => {
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

        response = await chai.request(app).post('/users').send({
          name: 'name-test-success',
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

      it('retorna o código 201', () => {
        expect(response).to.have.status(201);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto retornado tem a chave "user', () => {
        expect(response.body).to.include.a.key('user');
      });

      it('a chave "user" deve ser um objeto', () => {
        expect(response.body.user).to.be.an('object');
      });

      it('objeto retornado tem todas as chaves esperadas', () => {
        expect(response.body.user).to.include.all.keys(
          'name',
          'email',
          'role',
          '_id'
        );
      });

      it('a chave "role" de "user" deve ter o valor "user"', () => {
        expect(response.body.user.role).to.be.equal('user');
      });
    });

    describe('FALHA', () => {
      let connectionMock;
      const DBServer = new MongoMemoryServer();
      const MISSING_ENTRY_MESSAGE = 'Invalid entries. Try again.';

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

      describe('Quando o campo "name" não é inserido', () => {
        let response;
        before(async () => {
          response = await chai.request(app).post('/users').send({
            email: 'testfail@email.com',
            password: 'password-test-fail',
          });
        });

        it('retorna o código 400', () => {
          expect(response).to.have.status(400);
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

      describe('Quando o campo "email" não é inserido', () => {
        let response;
        before(async () => {
          response = await chai.request(app).post('/users').send({
            name: 'name-test-fail',
            password: 'password-test-fail',
          });
        });

        it('retorna o código 400', () => {
          expect(response).to.have.status(400);
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
          response = await chai.request(app).post('/users').send({
            name: 'name-test-fail',
            email: 'testfail@',
            password: 'password-test-fail',
          });
        });

        it('retorna o código 400', () => {
          expect(response).to.have.status(400);
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

      describe('Quando o campo "email" já existe', () => {
        let response;
        before(async () => {
          await connectionMock.db('Cookmaster').collection('users').insertOne({
            name: 'name-test-fail',
            email: 'testfail@email',
            password: 'password-test-fail',
          });

          response = await chai.request(app).post('/users').send({
            name: 'name-test-fail',
            email: 'testfail@email',
            password: 'password-test-fail',
          });
        });

        after(async () => {
          connectionMock
            .db('Cookmaster')
            .collection('users')
            .deleteMany({ name: 'name-test-fail' });
        });

        it('retorna o código 400', () => {
          expect(response).to.have.status(400);
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

      describe('Quando o campo "password" não é inserido', () => {
        let response;
        before(async () => {
          response = await chai.request(app).post('/users').send({
            name: 'name-test-success',
            email: 'testsuccess@email.com',
          });
        });

        it('retorna o código 400', () => {
          expect(response).to.have.status(400);
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
