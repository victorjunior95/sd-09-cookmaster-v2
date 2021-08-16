const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { expect } = chai;

let connectionMock;

describe('POST /recipes', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When recipe is created with success', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'examplePassword'
        })
        .then((res) => res.body.token);

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredients',
          preparation: 'examplePreparation'
        });
    });

    it('should return a 201 status code', () => {
      expect(response).to.have.status(201);
    });

    it('should have a body in the response', () => {
      expect(response.body).to.be.an('object');
    });

    it('should have a property "recipe" in the response body', () => {
      expect(response.body).to.have.property('recipe');
    });
  });

  describe('When an invalid field is send', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'examplePassword'
        })
        .then((res) => res.body.token);

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'exampleRecipe',
          ingredients: '',
          preparation: 'examplePreparation'
        });
    });

    it('should return a 400 status code', () => {
      expect(response).to.have.status(400);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('When an invalid auth token is send', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', '9999')
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredients',
          preparation: 'examplePreparation'
        });
    });

    it('should return a 401 status code', () => {
      expect(response).to.have.status(401);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "jwt malformed"', () => {
      expect(response.body.message).to.be.equals('jwt malformed');
    });
  });
});

describe('GET /recipes', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When get all recipes with success', () => {
    let response;

    before(async () => {
      const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
      await recipesCollection.insertMany([
        {
          name: 'exampleRecipe1',
          ingredients: 'exampleIngredients1',
          preparation: 'examplePreparation1'
        },
        {
          name: 'exampleRecipe2',
          ingredients: 'exampleIngredients2',
          preparation: 'examplePreparation2'
        }
      ]);

      response = await chai.request(server)
        .get('/recipes')
        .send({});
    });

    it('should return a 200 status code', () => {
      expect(response).to.have.status(200);
    });

    it('should have a body in the response', () => {
      expect(response.body).to.be.an('array');
    });
  });
});

describe('GET /recipes/:id', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When get the specific recipe with success', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'examplePassword'
        })
        .then((res) => res.body.token);

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredients',
          preparation: 'examplePreparation'
        })
        .then((res) => res.body.recipe);

      response = await chai.request(server)
        .get(`/recipes/${recipe._id}`)
        .send({});
    });

    it('should return a 200 status code', () => {
      expect(response).to.have.status(200);
    });

    it('should have a body in the response', () => {
      expect(response.body).to.be.an('object');
    });
  });

  describe('When send an invalid ID', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .get('/recipes/9999')
        .send({});
    });

    it('should return a 404 status code', () => {
      expect(response).to.have.status(404);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "recipe not found"', () => {
      expect(response.body.message).to.be.equals('recipe not found');
    });
  });

  describe('When there is no return from the DB', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .get(`/recipes/60c7ae27f206d3f3f4cde498`)
        .send({});
    });

    it('should return a 404 status code', () => {
      expect(response).to.have.status(404);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "recipe not found"', () => {
      expect(response.body.message).to.be.equals('recipe not found');
    });
  });
});

describe('DELETE /recipes/:id', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When recipe is removed with success', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'examplePassword'
        })
        .then((res) => res.body.token);

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredients',
          preparation: 'examplePreparation'
        })
        .then((res) => res.body.recipe);

      response = await chai.request(server)
        .delete(`/recipes/${recipe._id}`)
        .set('authorization', token)
        .send({});
    });

    it('should return a 204 status code', () => {
      expect(response).to.have.status(204);
    });

    it('should have no content in the body', () => {
      expect(response.body).to.be.empty;
    });
  });

  describe('When no auth token is send', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'examplePassword'
        })
        .then((res) => res.body.token);

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredients',
          preparation: 'examplePreparation'
        })
        .then((res) => res.body.recipe);

      response = await chai.request(server)
        .delete(`/recipes/${recipe._id}`)
        .set('authorization', '')
        .send({});
    });

    it('should return a 401 status code', () => {
      expect(response).to.have.status(401);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "missing auth token"', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    });
  });

  describe('When an invalid auth token is send', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'examplePassword'
        })
        .then((res) => res.body.token);

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredients',
          preparation: 'examplePreparation'
        })
        .then((res) => res.body.recipe);

      response = await chai.request(server)
        .delete(`/recipes/${recipe._id}`)
        .set('authorization', '9999')
        .send({});
    });

    it('should return a 401 status code', () => {
      expect(response).to.have.status(401);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "jwt malformed"', () => {
      expect(response.body.message).to.be.equals('jwt malformed');
    });
  });
});

describe('PUT /recipes/:id', async () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When recipe is updated with success', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'examplePassword'
        })
        .then((res) => res.body.token);

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredients',
          preparation: 'examplePreparation'
        })
        .then((res) => res.body.recipe);

      response = await chai.request(server)
        .put(`/recipes/${recipe._id}`)
        .set('authorization', token)
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredientsUpdated',
          preparation: 'examplePreparationUpdated'
        });
    });

    it('should return a 200 status code', () => {
      expect(response).to.have.status(200);
    });

    it('should have a body in the response', () => {
      expect(response.body).to.be.an('object');
    });

    it('should have a property "_id" in the response body', () => {
      expect(response.body).to.have.property('_id');
    });
  });

  describe('When no auth token is send', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'examplePassword'
        })
        .then((res) => res.body.token);

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredients',
          preparation: 'examplePreparation'
        })
        .then((res) => res.body.recipe);

      response = await chai.request(server)
        .put(`/recipes/${recipe._id}`)
        .set('authorization', '')
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredientsUpdated',
          preparation: 'examplePreparationUpdated'
        });
    });

    it('should return a 401 status code', () => {
      expect(response).to.have.status(401);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "missing auth token"', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    });
  });

  describe('When an invalid auth token is send', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'exampleName',
        email: 'example@example.com',
        password: 'examplePassword'
      });

      const token = await chai.request(server)
        .post('/login')
        .send({
          email: 'example@example.com',
          password: 'examplePassword'
        })
        .then((res) => res.body.token);

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredients',
          preparation: 'examplePreparation'
        })
        .then((res) => res.body.recipe);

      response = await chai.request(server)
        .put(`/recipes/${recipe._id}`)
        .set('authorization', '99999')
        .send({
          name: 'exampleRecipe',
          ingredients: 'exampleIngredientsUpdated',
          preparation: 'examplePreparationUpdated'
        });
    });

    it('should return a 401 status code', () => {
      expect(response).to.have.status(401);
    });

    it('should have a body with property "message" in the response', () => {
      expect(response.body).to.have.property('message');
    });

    it('should have the message "jwt malformed"', () => {
      expect(response.body.message).to.be.equals('jwt malformed');
    });
  });
});
