const chai = require('chai');
const sinon = require('sinon');
const app = require('../api/app');
const chaiHttp = require('chai-http');
const { response } = require('express');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const { expect } = chai;

chai.use(chaiHttp);
describe('POST /recipes', () => {
  describe('caso token invalido', () => {
    before(async () => {
      response = await chai.request(app).post('/recipes');
    });

    it('retorna um HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

    it(' retorna `message` ', () =>
      expect(response.body).to.have.a.property('message'));

    it('retorna messagem de erro', () =>
      expect(response.body.message).to.be.equal('missing auth token'));
  });

  describe('Quando receita invalida', () => {
    const userOk = { name: 'user-name', email: 'user-email@email.com', password: 'user-password' };
    
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(userOk);

      const { body: { token }} = await chai.request(app).post('/login').send(userOk);

      response = await chai.request(app).post('/recipes').set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ username: 'user-name' });
    });

    it('retorna um HTTP status 400', () =>
      expect(response).to.have.status(400));

    it('retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

      it('retorna `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('retorna menssagem de erro', () =>
      expect(response.body.message).to.be.equal('Invalid entries. Try again.'));
  });

  describe('when recipe is created successfully', () => {
    const userOk = { name: 'user-name', email: 'user-email@email.com', password: 'user-password' };
    const recipe = { name: 'recipe', ingredients: 'ings', preparation: 'preps' };
    
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

    it('retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('retorna  `recipe`', () =>
      expect(response.body).to.have.property('recipe'));

    it('`recipe`nao esta vazia ', () =>
      expect(response.body.recipe).to.not.be.empty);
  });
});

describe('GET /recipes', () => {
  describe('quando na ha receitas no banco', () => {
   
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

    it('retorna uma array', () =>
      expect(response.body).to.be.an('array'));

    it('array esta vazia', () =>
    expect(response.body).to.be.empty);
  });

  describe('Quando ha receitas no banco', () => {
    const recipe = { name: 'recipe', ingredients: 'ings', preparation: 'preps' };
    
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

    it('retorna uma array', () =>
      expect(response.body).to.be.an('array'));

    it('o retorno é uma array de objetos', () =>
    expect(response.body[0]).to.be.an('object'));

    it('`receita` tem campos "name", "ingredients" e "preparation"', () =>
      expect(response.body[0]).to.include.all.keys('name', 'ingredients', 'preparation'));
  });
});

describe('GET /recipes:id', () => {
  describe('Quando nao ha registro no banco ', () => {
   
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

    it('retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

      it('retorna `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('retorna menssage de erro como esperado', () =>
      expect(response.body.message).to.be.equal('recipe not found'));
  });

  describe('quando nao há registro no banco', () => {
    const userOk = { name: 'user-ok', email: 'user-ok@email.com', password: 'password-ok' };
    const recipe = { name: 'recipe', ingredients: 'ings', preparation: 'preps' };
    
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

    it('retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('`recipe` tem propriedade "name", "ingredients" e "preparation"', () =>
      expect(response.body).to.include.all.keys('name', 'ingredients', 'preparation'));
  });
});

describe('PUT /recipes:id', () => {
  describe('Quanto token for invalido', () => {
    
    before(async () => {
      response = await chai.request(app).put('/recipes/id');
    });

    it('retorna um HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('retorna `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('retorna mensagem de erro como esperado', () =>
      expect(response.body.message).to.be.equal('missing auth token'));
  });

  describe('Quanto receita é atualizada com sucesso', () => {
    const userOk = { name: 'user-ok', email: 'user-ok@email.com', password: 'password-ok' };
    const recipe = { name: 'recipe', ingredients: 'ings', preparation: 'preps' };
    const recipeEdit = { name: 'recipe-edit', ingredients: 'ings-edit', preparation: 'preps-edit' };
    
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

    it('retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('`recipe` tem as propriedades "name", "ingredients" e "preparation"', () =>
      expect(response.body).to.include.all.keys('name', 'ingredients', 'preparation'));
  });
});

describe('metodo deletar receita', () => {
  describe('Quanto o token e invalido', () => {
    
    before(async () => {
      response = await chai.request(app).delete('/recipes/id');
    });

    it('retorna um HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('retorna um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('retorna `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('retorna menssagem de erro como esperado', () =>
      expect(response.body.message).to.be.equal('missing auth token'));
  });

  describe('Quando receita e deletada com sucesso', () => {
    const userOk = { name: 'user-ok', email: 'user-ok@email.com', password: 'password-ok' };
    const recipe = { name: 'recipe', ingredients: 'ings', preparation: 'preps' };
    
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

    it('retorna um HTTP status', () =>
      expect(response).to.have.status(204));
  });
});