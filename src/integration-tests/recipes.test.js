const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../api/app');
const getConnection = require('./connectionMock');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /recipes', () => {
  describe('when invalid token', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/recipes');
    });

    it('returns HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

    it('returns a `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('returns an error message', () =>
      expect(response.body.message).to.be.equal('missing auth token'));
  });

  describe('when invalid recipe', () => {
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

    it('returns HTTP status 400', () =>
      expect(response).to.have.status(400));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

      it('returns a `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('returns an error message', () =>
      expect(response.body.message).to.be.equal('Invalid entries. Try again.'));
  });

  describe('when recipe is created successfully', () => {
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

    it('returns HTTP status 201', () =>
      expect(response).to.have.status(201));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

    it('returns a `recipe`', () =>
      expect(response.body).to.have.property('recipe'));

    it('`recipe` is not empty', () =>
      expect(response.body.recipe).to.not.be.empty);
  });
});

describe('GET /recipes', () => {
  describe('when DB is empty', () => {
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

    it('returns HTTP status 200', () =>
      expect(response).to.have.status(200));

    it('returns an array', () =>
      expect(response.body).to.be.an('array'));

    it('array is empty', () =>
    expect(response.body).to.be.empty);
  });

  describe('when DB has items', () => {
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

    it('returns HTTP status 200', () =>
      expect(response).to.have.status(200));

    it('returns an array', () =>
      expect(response.body).to.be.an('array'));

    it('returns an array of objects', () =>
    expect(response.body[0]).to.be.an('object'));

    it('`recipe` has properties "name", "ingredients" and "preparation"', () =>
      expect(response.body[0]).to.include.all.keys('name', 'ingredients', 'preparation'));
  });
});

describe('GET /recipes:id', () => {
  describe('when DB is empty', () => {
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

    it('returns HTTP status 404', () =>
      expect(response).to.have.status(404));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

      it('returns a `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('returns an error message', () =>
      expect(response.body.message).to.be.equal('recipe not found'));
  });

  describe('when DB has items', () => {
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

    it('returns HTTP status 200', () =>
      expect(response).to.have.status(200));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

    it('`recipe` has properties "name", "ingredients" and "preparation"', () =>
      expect(response.body).to.include.all.keys('name', 'ingredients', 'preparation'));
  });
});

describe('PUT /recipes:id', () => {
  describe('when invalid token', () => {
    let response;

    before(async () => {
      response = await chai.request(app).put('/recipes/id');
    });

    it('returns HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

    it('returns a `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('returns an error message', () =>
      expect(response.body.message).to.be.equal('missing auth token'));
  });

  describe('when recipe is updated successfully', () => {
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

    it('returns HTTP status 200', () =>
      expect(response).to.have.status(200));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

    it('`recipe` has properties "name", "ingredients" and "preparation"', () =>
      expect(response.body).to.include.all.keys('name', 'ingredients', 'preparation'));
  });
});

describe('DELETE /recipes:id', () => {
  describe('when invalid token', () => {
    let response;

    before(async () => {
      response = await chai.request(app).delete('/recipes/id');
    });

    it('returns HTTP status 401', () =>
      expect(response).to.have.status(401));

    it('returns an object', () =>
      expect(response.body).to.be.an('object'));

    it('returns a `message`', () =>
      expect(response.body).to.have.a.property('message'));

    it('returns an error message', () =>
      expect(response.body.message).to.be.equal('missing auth token'));
  });

  describe('when recipe is removed successfully', () => {
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

    it('returns HTTP status 204', () =>
      expect(response).to.have.status(204));
  });
});
