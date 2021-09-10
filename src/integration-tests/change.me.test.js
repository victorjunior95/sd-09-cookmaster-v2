const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../api/app');
const getConnection = require('./connectionMock');
const { MongoClient } = require('mongodb');

const { expect } = chai;

describe('testa a rota de criar usuário', () => {
  describe('quando o usuário é criado', () => {
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
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
    });

    it('resposta retorna http 201', () =>
      expect(response).to.have.status(201));

    it('resposta retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('resposta retorna um usuário', () =>
      expect(response.body).to.have.property('user'));

    it('usuário é válido', () =>
      expect(response.body.user).to.include.all.keys('name', 'email', 'role'));
  });
});

describe('Testa a rota de Login', () => {
  describe('quando usuário, email ou senha é invalido', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login').send({});
    });

    it('resposta retorna http 401', () =>
      expect(response).to.have.status(401));

    it('resposta retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('resposta retorna uma mensagem', () =>
      expect(response.body).to.have.a.property('message'));

    it('a mensagem retornada é um erro', () =>
      expect(response.body.message).to.be.equal('All fields must be filled'));
  });

  describe('quando usuário não existe', () => {
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

    it('resposta retorna http 401', () =>
      expect(response).to.have.status(401));

    it('resposta retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('resposta retorna uma mensagem', () =>
      expect(response.body).to.have.property('message'));

    it('a mensagem retornada é um erro', () =>
      expect(response.body.message).to.equal('Incorrect username or password'));
  });

  describe('quando o login é feito', () => {
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

    it('resposta retorna http 200', () =>
      expect(response).to.have.status(200));

    it('resposta retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('resposta retorna um token', () =>
      expect(response.body).to.have.property('token'));

    it('token é válido', () =>
      expect(response.body.token).to.not.be.empty);
  });
});


describe('testa a roda POST recipes', () => {
  describe('quando o token é inválido', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/recipes');
    });

    it('resposta retorna http 401', () =>
      expect(response).to.have.status(401));

    it('resposta retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('resposta retorna uma mensagem', () =>
      expect(response.body).to.have.a.property('message'));

    it('a mensagem retornada é um erro', () =>
      expect(response.body.message).to.be.equal('missing auth token'));
  });

  describe('quando a receita é inválida', () => {
    const userOk = { name: 'user-ok', email: 'user-ok@email.com', password: 'password-ok' };
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(userOk);

      const { body: { token }} = await chai.request(app).post('/login').send(userOk);

      response = await chai.request(app).post('/recipes').set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ username: 'user-ok' });
    });

    it('resposta retorna http 400', () =>
      expect(response).to.have.status(400));

    it('resposta retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

      it('resposta retorna uma mensagem', () =>
      expect(response.body).to.have.a.property('message'));

    it('a mensagem retornada é um erro', () =>
      expect(response.body.message).to.be.equal('Invalid entries. Try again.'));
  });

  describe('quando a receita é criada com sucesso', () => {
    const userOk = { name: 'user-ok', email: 'user-ok@email.com', password: 'password-ok' };
    const recipe = { name: 'recipe', ingredients: 'ings', preparation: 'preps' };
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(userOk);

      const { body: { token }} = await chai.request(app).post('/login').send(userOk);

      response = await chai.request(app).post('/recipes').set('authorization', token).send(recipe);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ username: 'user-ok' });
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
    });

    it('resposta retorna http 201', () =>
      expect(response).to.have.status(201));

    it('resposta retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('resposta retorna uma recipe', () =>
      expect(response.body).to.have.property('recipe'));

    it('recipe é válida', () =>
      expect(response.body.recipe).to.not.be.empty);
  });
});

describe('testa a rota GET recipes', () => {
  describe('quando o DB está vazio', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(app).get('/recipes');
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ username: 'user-ok' });
    });

    it('resposta retorna http 200', () =>
      expect(response).to.have.status(200));

    it('resposta retorna um array', () =>
      expect(response.body).to.be.an('array'));

    it('array possuí elementos', () =>
    expect(response.body).to.be.empty);
  });

  describe('quando a DB possui elementos', () => {
    const recipe = { name: 'recipe', ingredients: 'ings', preparation: 'preps' };
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').insertOne(recipe);

      response = await chai.request(app).get('/recipes');
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ username: 'user-ok' });
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
    });

    it('resposta retorna HTTP status 200', () =>
      expect(response).to.have.status(200));

    it('resposta retorna um array', () =>
      expect(response.body).to.be.an('array'));

    it('array possuí objetos', () =>
    expect(response.body[0]).to.be.an('object'));

    it('recipe é válida', () =>
      expect(response.body[0]).to.include.all.keys('name', 'ingredients', 'preparation'));
  });
});
