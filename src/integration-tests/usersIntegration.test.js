const chai = require('chai');
const sinon = require('sinon');
const app = require('../api/app');
const { getConnection } = require('./connectionMock');

const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para a rota /users', () => {
  describe('endpoint POST /', () => {
    describe('Quando fazemos uma requisição malsucedida', () => {
      describe('Quando os campos nome, email ou senha, não são informados', () => {
        let response;

        before(async () => {
          response = await chai.request(app).post('/users/').send({});
        });

        it('deve retornar com o status HTTP 400', () => {
          expect(response).to.have.status(400);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('Invalid entries. Try again.');
        });
      });

      describe('Quando os campos são informados, mas o email não tem a estrutura correta', () => {
        let response;

        before(async () => {
          response = await chai.request(app).post('/users/')
            .send({ name: 'Yoneda', email: 'yoneda', password: 'trybe2021' });
        });

        it('deve retornar com o status HTTP 400', () => {
          expect(response).to.have.status(400);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('Invalid entries. Try again.');
        });
      });

      describe('Quando o usuário já existe no banco de dados', () => {
        let connectionMock;
        let response;

        before(async () => {
          connectionMock = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock.db('Cookmaster').collection('users')
            .insertOne({ name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021' });

          response = await chai.request(app).post('/users')
            .send({ name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021' });
        });

        after(async () => {
          MongoClient.connect.restore();
          await connectionMock.db('Cookmaster').collection('users').deleteOne({ email: 'yoneda@trybe.com' });
        });

        it('deve retornar com o status HTTP 409', () => {
          expect(response).to.have.status(409);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('Email already registered');
        });
      });
      // fim dos testes de requisição malsucedidas
    });
    describe('Quando conseguimos cadastrar um novo usuário com sucesso', () => {
      let connectionMock;
      let response;

      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        response = await chai.request(app).post('/users')
          .send({ name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021' });
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteOne({ email: 'yoneda@trybe.com' });
      });

      it('deve retornar com o status HTTP 201', () => {
        expect(response).to.have.status(201);
      });

      it('deve retornar um objeto no body com a key "user"', () => {
        expect(response.body).to.be.an('object').to.have.property('user');
      });

      it('deve retornar um objeto com os dados corretos do usuário cadastrado', () => {
        expect(response.body.user).to.be.an('object').to.have.all.keys('name', 'email', 'role', '_id');
      });
    });
    // fim da rota /users
  });

  describe('endpoint POST /admin', () => {
    describe('Quando fazemos uma requisição mal sucedida', () => {
      describe('Quando os campos nome, email ou senha, não são informados', () => {
        let response;

        before(async () => {
          response = await chai.request(app).post('/users/admin').send({});
        });

        it('deve retornar com o status HTTP 400', () => {
          expect(response).to.have.status(400);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('Invalid entries. Try again.');
        });
      });

      describe('Quando os campos são informados, mas o email não tem a estrutura correta', () => {
        let response;

        before(async () => {
          response = await chai.request(app).post('/users/admin')
            .send({ name: 'Yoneda', email: 'yoneda', password: 'trybe2021' });
        });

        it('deve retornar com o status HTTP 400', () => {
          expect(response).to.have.status(400);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('Invalid entries. Try again.');
        });
      });

      describe('Quando o usuário não tem a role admin', async () => {
        let connectionMock;
        let response;
        let loginData;
        let token;

        before(async () => {
          connectionMock = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock.db('Cookmaster').collection('users')
            .insertOne({ name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021' });

          loginResponse = await chai.request(app).post('/login')
            .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });

          token = loginResponse.body.token;

          response = await chai.request(app).post('/users/admin')
            .send({ name: 'New admin', email: 'newadmin@admin.com', password: 'newAdmin2021' })
            .set({ authorization: token });
        });

        after(async () => {
          MongoClient.connect.restore();
          await connectionMock.db('Cookmaster').collection('users').deleteOne({ email: 'yoneda@trybe.com' });
        });

        it('deve ter retornar status HTTP 403', () => {
          expect(response).to.have.status(403);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('Only admins can register new admins');
        });
      });

      describe('Quando já tem o admin cadastrado', async () => {
        let connectionMock;
        let response;
        let loginData;
        let token;

        before(async () => {
          connectionMock = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock.db('Cookmaster').collection('users')
            .insertOne({ name: 'Admin', email: 'admin@admin.com', password: 'admin2021', role: 'admin' });
          await connectionMock.db('Cookmaster').collection('users')
            .insertOne({ name: 'New admin', email: 'newadmin@admin.com', password: 'admin2021', role: 'admin' });

          loginResponse = await chai.request(app).post('/login')
            .send({ email: 'admin@admin.com', password: 'admin2021' });

          token = loginResponse.body.token;

          response = await chai.request(app).post('/users/admin')
            .send({ name: 'New admin', email: 'newadmin@admin.com', password: 'newAdmin2021' })
            .set({ authorization: token });
        });

        after(async () => {
          MongoClient.connect.restore();
          await connectionMock.db('Cookmaster').collection('users').deleteMany({});
        });

        it('deve retornar com o status HTTP 409', () => {
          expect(response).to.have.status(409);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('Email already registered');
        });
      });
      // fim dos testes de requisição malsucedidas
    });
    describe('Quando cadastramos um novo admin com sucesso', () => {
      let connectionMock;
      let response;
      let loginData;
      let token;

      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users')
          .insertOne({ name: 'Admin', email: 'admin@admin.com', password: 'admin2021', role: 'admin' });

        loginResponse = await chai.request(app).post('/login')
          .send({ email: 'admin@admin.com', password: 'admin2021' });

        token = loginResponse.body.token;

        response = await chai.request(app).post('/users/admin')
          .send({ name: 'New admin', email: 'newadmin@admin.com', password: 'newAdmin2021' })
          .set({ authorization: token });
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      });

      it('deve retornar com o status HTTP 201', () => {
        expect(response).to.have.status(201);
      });

      it('deve retornar um objeto no body com a key "message"', () => {
        expect(response.body).to.be.an('object').to.have.property('user');
      });

      it('deve retornar um objeto um objeto com os dados do admin cadastrado"', () => {
        expect(response.body.user).to.be.an('object').to.have.all.keys('name', 'email', 'role', '_id');
      });
    });
  // fim da rota /users/admin
  });
});
