const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../api/app');
const getConnection = require('./connectionMock');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /recipes', () => {
  describe('quando o token é inválido', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/recipes');
    });

    it('retorna um HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('retorna um object', () =>
      expect(response.body).to.be.an('object'));

    it('retorna uma  `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('retorna um mensagem de erro', () =>
      expect(response.body.message).to.be.equal('missing auth token'));
  });

  describe('quando uma receita é inválida', () => {
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
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ email: 'user-ok@email.com' });
    });

    it('retorna um HTTP status 400', () =>
      expect(response).to.have.status(400));

    it('retorna um  object', () =>
      expect(response.body).to.be.an('object'));

      it('retorna uma `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('retorna uma mensagem de erro', () =>
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

    it('retorna um HTTP status 201', () =>
      expect(response).to.have.status(201));

    it('retorna um object', () =>
      expect(response.body).to.be.an('object'));

    it('retorna uma `recipe`', () =>
      expect(response.body).to.have.property('recipe'));

    it('`recipe` não é vazio', () =>
      expect(response.body.recipe).to.not.be.empty);
  });
});

describe('GET /recipes', () => {
  describe('quando a DB está vazia', () => {
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

    it('retorna um HTTP status 200', () =>
      expect(response).to.have.status(200));

    it('retorna um array', () =>
      expect(response.body).to.be.an('array'));

    it('array não está vazio', () =>
    expect(response.body).to.be.empty);
  });

  describe('quando a DB tem itens', () => {
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

    it('retorna um HTTP status 200', () =>
      expect(response).to.have.status(200));

    it('retorna um array', () =>
      expect(response.body).to.be.an('array'));

    it('retorna um array de objects', () =>
    expect(response.body[0]).to.be.an('object'));

    it('`recipe` tem as chaves "name", "ingredients" and "preparation"', () =>
      expect(response.body[0]).to.include.all.keys('name', 'ingredients', 'preparation'));
  });
});

describe('GET /recipes:id', () => {
  describe('quando a DB está vazis', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(app).get('/recipes/id');
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ username: 'user-ok' });
    });

    it('retorna um HTTP status 404', () =>
      expect(response).to.have.status(404));

    it('retorna um object', () =>
      expect(response.body).to.be.an('object'));

      it('retorna uma `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('retorna uma mensagem error', () =>
      expect(response.body.message).to.be.equal('recipe not found'));
  });

  describe('quando a DB tem itens', () => {
    const userOk = { name: 'user-ok', email: 'user-ok@email.com', password: 'password-ok' };
    const recipe = { name: 'recipe', ingredients: 'ings', preparation: 'preps' };
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { body: { token }} = await chai.request(app).post('/login').send(userOk);

      const { ops } = await connectionMock.db('Cookmaster').collection('recipes').insertOne(recipe);

      response = await chai.request(app).get(`/recipes/${ops[0]._id}`).set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ username: 'user-ok' });
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
    });

    it('retorna um HTTP status 200', () =>
      expect(response).to.have.status(200));

    it('retorna um object', () =>
      expect(response.body).to.be.an('object'));

    it('`recipe` tem as chaves "name", "ingredients" and "preparation"', () =>
      expect(response.body).to.include.all.keys('name', 'ingredients', 'preparation'));
  });
});

describe('PUT /recipes:id', () => {
  describe('quando o token é inválido', () => {
    let response;

    before(async () => {
      response = await chai.request(app).put('/recipes/id');
    });

    it('retorna um HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('retorna um object', () =>
      expect(response.body).to.be.an('object'));

    it('retorna uma `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('retorna uma mensagem error', () =>
      expect(response.body.message).to.be.equal('missing auth token'));
  });

  describe('quando a receita é atualizada com sucesso', () => {
    const userOk = { name: 'user-ok', email: 'user-ok@email.com', password: 'password-ok' };
    const recipe = { name: 'recipe', ingredients: 'ings', preparation: 'preps' };
    const recipeEdit = { name: 'recipe-edit', ingredients: 'ings-edit', preparation: 'preps-edit' };
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { body: { token }} = await chai.request(app).post('/login').send(userOk);

      const { ops } = await connectionMock.db('Cookmaster').collection('recipes').insertOne(recipe);

      response = await chai.request(app).put(`/recipes/${ops[0]._id}`)
        .set('authorization', token).send(recipeEdit);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ username: 'user-ok' });
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
    });

    it('retorna um HTTP status 200', () =>
      expect(response).to.have.status(200));

    it('retorna um object', () =>
      expect(response.body).to.be.an('object'));

    it('`recipe` tem as chaves "name", "ingredients" and "preparation"', () =>
      expect(response.body).to.include.all.keys('name', 'ingredients', 'preparation'));
  });
});

describe('DELETE /recipes:id', () => {
  describe('quando o token é inválido', () => {
    let response;

    before(async () => {
      response = await chai.request(app).delete('/recipes/id');
    });

    it('retorna um HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('retorna um object', () =>
      expect(response.body).to.be.an('object'));

    it('retorna uma `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('retorna uma mensagem error', () =>
      expect(response.body.message).to.be.equal('missing auth token'));
  });

  describe('quando a receita é removida com sucesso', () => {
    const userOk = { name: 'user-ok', email: 'user-ok@email.com', password: 'password-ok' };
    const recipe = { name: 'recipe', ingredients: 'ings', preparation: 'preps' };
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { body: { token }} = await chai.request(app).post('/login').send(userOk);

      const { ops } = await connectionMock.db('Cookmaster').collection('recipes').insertOne(recipe);

      response = await chai.request(app).delete(`/recipes/${ops[0]._id}`)
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ username: 'user-ok' });
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
    });

    it('retorna um HTTP status 204', () =>
      expect(response).to.have.status(204));
  });
});