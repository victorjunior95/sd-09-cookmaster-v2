const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const fs = require('fs');

const server = require('../api/app');
const connection = require('./connectionMock');

const { expect } = chai;
chai.use(chaiHttp);

const VALID_LOGIN = {
  email: 'mockuseremail@email.com',
  password: 'mockuserpassword',
};

const VALID_RECIPE = {
  name: 'A Mock Recipe',
  ingredients: 'Mock pineapple, mock pine, mock apple',
  preparation: 'Take a mock knife and mock cut them all',
};

const ALL_RECIPES = [
  {
    name: 'A Mock Recipe',
    ingredients: 'Mock pineapple, mock pine, mock apple',
    preparation: 'Take a mock knife and mock cut them all',
  },
  {
    name: 'A Mock Recipe 2',
    ingredients: 'Mock meat, mock pork, mock chicken',
    preparation: 'Take a mock pan and fry them all',
  },
];

let connectionMock;

describe('Testa o caminho "/recipes"', () => {
  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Testa a adição de uma receita', () => {
    describe('1 - Testa se adiciona uma receita com sucesso', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});
        await usersCollection.insertOne(VALID_LOGIN);

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        const token = await chai
          .request(server)
          .post('/login')
          .send(VALID_LOGIN)
          .then((response) => response.body.token);

        response = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE);
      });

      it('1 - retorna com código de status "201"', () => {
        expect(response).to.have.status(201);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - retorna um body com a propriedade "recipe"', () => {
        expect(response.body).to.have.property('recipe');
      });

      it('4 - o body tem o campo "name"', () => {
        expect(response.body.recipe).to.have.property('name');
      });

      it('5 - o body tem o campo "ingredients"', () => {
        expect(response.body.recipe).to.have.property('ingredients');
      });

      it('6 - o body tem o campo "preparation"', () => {
        expect(response.body.recipe).to.have.property('preparation');
      });

      it('7 - o body tem o campo "userId"', () => {
        expect(response.body.recipe).to.have.property('userId');
      });

      it('8 - o body tem o campo "_id"', () => {
        expect(response.body.recipe).to.have.property('_id');
      });
    });

    describe('2 - Testa a adição de uma receita sem o campo "name"', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});
        await usersCollection.insertOne(VALID_LOGIN);

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        const token = await chai
          .request(server)
          .post('/login')
          .send(VALID_LOGIN)
          .then((response) => response.body.token);

        response = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send({ ingredients: 'mock ingredients', preparation: 'mock prep' });
      });

      it('1 - retorna com código de status "400"', () => {
        expect(response).to.have.status(400);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - retorna um body com a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('4 - a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('3 - Testa a adição de uma receita sem o campo "ingredients"', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});
        await usersCollection.insertOne(VALID_LOGIN);

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        const token = await chai
          .request(server)
          .post('/login')
          .send(VALID_LOGIN)
          .then((response) => response.body.token);

        response = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send({ name: 'mock name', preparation: 'mock prep' });
      });

      it('1 - retorna com código de status "400"', () => {
        expect(response).to.have.status(400);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - retorna um body com a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('4 - a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('4 - Testa a adição de uma receita sem o campo "preparation"', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});
        await usersCollection.insertOne(VALID_LOGIN);

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        const token = await chai
          .request(server)
          .post('/login')
          .send(VALID_LOGIN)
          .then((response) => response.body.token);

        response = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send({ ingredients: 'mock ingredients', preparation: 'mock prep' });
      });

      it('1 - retorna com código de status "400"', () => {
        expect(response).to.have.status(400);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - retorna um body com a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('4 - a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('5 - Testa a adição de uma receita com um token inválido', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});
        await usersCollection.insertOne(VALID_LOGIN);

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        const token = await chai
          .request(server)
          .post('/login')
          .send(VALID_LOGIN)
          .then((response) => response.body.token);

        response = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', `a${token}`)
          .send({ ingredients: 'mock ingredients', preparation: 'mock prep' });
      });

      it('1 - retorna com código de status "401"', () => {
        expect(response).to.have.status(401);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - retorna um body com a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('4 - a propriedade "message" tem o valor "jwt malformed"', () => {
        expect(response.body.message).to.be.equal('jwt malformed');
      });
    });
  });

  describe('Testa a listagem de todas as receitas', () => {
    describe('1 - Testa se lista todas as receitas sem estar autenticado com sucesso', () => {
      let response;

      before(async () => {
        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});
        await recipesCollection.insertMany(ALL_RECIPES);

        response = await chai.request(server).get('/recipes');
      });

      it('1 - retorna com código de status "200"', () => {
        expect(response).to.have.status(200);
      });

      it('2 - retorna um array no body', () => {
        expect(response.body).to.be.an('array');
      });
    });

    describe('2 - Testa se lista todas as receitas estando autenticado com sucesso', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});
        await usersCollection.insertOne(VALID_LOGIN);

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});
        await recipesCollection.insertMany(ALL_RECIPES);

        const token = await chai
          .request(server)
          .post('/login')
          .send(VALID_LOGIN)
          .then((response) => response.body.token);

        response = await chai.request(server).get('/recipes').set('authorization', token);
      });

      it('1 - retorna com código de status "200"', () => {
        expect(response).to.have.status(200);
      });

      it('2 - retorna um array no body', () => {
        expect(response.body).to.be.an('array');
      });
    });
  });

  describe('Testa a listagem de uma receita específica', () => {
    describe('1 - Testa se lista a receita sem estar autenticado com sucesso', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});
        await usersCollection.insertOne(VALID_LOGIN);

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        const token = await chai
          .request(server)
          .post('/login')
          .send(VALID_LOGIN)
          .then((response) => response.body.token);

        const recipeId = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE)
          .then((response) => response.body.recipe._id);

        response = await chai.request(server).get(`/recipes/${recipeId}`);
      });

      it('1 - retorna com código de status "200"', () => {
        expect(response).to.have.status(200);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - o body tem o campo "name"', () => {
        expect(response.body).to.have.property('name');
      });

      it('4 - o body tem o campo "ingredients"', () => {
        expect(response.body).to.have.property('ingredients');
      });

      it('5 - o body tem o campo "preparation"', () => {
        expect(response.body).to.have.property('preparation');
      });

      it('6 - o body tem o campo "userId"', () => {
        expect(response.body).to.have.property('userId');
      });

      it('7 - o body tem o campo "_id"', () => {
        expect(response.body).to.have.property('_id');
      });
    });

    describe('2 - Testa se lista a receita estando autenticado com sucesso', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});
        await usersCollection.insertOne(VALID_LOGIN);

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        const token = await chai
          .request(server)
          .post('/login')
          .send(VALID_LOGIN)
          .then((response) => response.body.token);

        const recipeId = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE)
          .then((response) => response.body.recipe._id);

        response = await chai
          .request(server)
          .get(`/recipes/${recipeId}`)
          .set('authorization', token);
      });

      it('1 - retorna com código de status "200"', () => {
        expect(response).to.have.status(200);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - o body tem o campo "name"', () => {
        expect(response.body).to.have.property('name');
      });

      it('4 - o body tem o campo "ingredients"', () => {
        expect(response.body).to.have.property('ingredients');
      });

      it('5 - o body tem o campo "preparation"', () => {
        expect(response.body).to.have.property('preparation');
      });

      it('6 - o body tem o campo "userId"', () => {
        expect(response.body).to.have.property('userId');
      });

      it('7 - o body tem o campo "_id"', () => {
        expect(response.body).to.have.property('_id');
      });
    });

    describe('3 - Testa se retorna um erro ao buscar uma receita com ID inválido', () => {
      let response;

      before(async () => {
        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        response = await chai.request(server).get(`/recipes/60c6b878b42a849ab051ed8f`);
      });

      it('1 - retorna com código de status "404"', () => {
        expect(response).to.have.status(404);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - retorna um body com a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('4 - a propriedade "message" tem o valor "recipe not found"', () => {
        expect(response.body.message).to.be.equal('recipe not found');
      });
    });
  });

  describe('Testa a edição de uma receita específica', () => {
    describe('1 - Testa se edita a receita estando autenticado com sucesso e sendo o autor da receita', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});
        await usersCollection.insertOne(VALID_LOGIN);

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        const token = await chai
          .request(server)
          .post('/login')
          .send(VALID_LOGIN)
          .then((response) => response.body.token);

        const recipeId = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE)
          .then((response) => response.body.recipe._id);

        response = await chai
          .request(server)
          .put(`/recipes/${recipeId}`)
          .set('authorization', token)
          .send({
            name: 'Mock name edited',
            ingredients: 'Mock ingredients edited',
            preparation: 'Mock preparation edited',
          });
      });

      it('1 - retorna com código de status "200"', () => {
        expect(response).to.have.status(200);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - o body tem o campo "name"', () => {
        expect(response.body).to.have.property('name');
      });

      it('4 - o body tem o campo "ingredients"', () => {
        expect(response.body).to.have.property('ingredients');
      });

      it('5 - o body tem o campo "preparation"', () => {
        expect(response.body).to.have.property('preparation');
      });

      it('6 - o body tem o campo "userId"', () => {
        expect(response.body).to.have.property('userId');
      });

      it('7 - o body tem o campo "_id"', () => {
        expect(response.body).to.have.property('_id');
      });

      it('8 - a receita deve ter sido atualizado', () => {
        expect(response.body).to.not.be.deep.equal(VALID_RECIPE);
      });
    });

    describe('2 - Testa se edita a receita estando autenticado com sucesso e tendo "role" com valor "admin"', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        await chai.request(server).post('/users').send({
          name: 'admin user',
          email: 'admin@email.com',
          password: 'adminuserpassword',
          role: 'admin',
        });

        const token = await chai
          .request(server)
          .post('/login')
          .send({ email: 'admin@email.com', password: 'adminuserpassword' })
          .then((response) => response.body.token);

        const recipeId = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE)
          .then((response) => response.body.recipe._id);

        response = await chai
          .request(server)
          .put(`/recipes/${recipeId}`)
          .set('authorization', token)
          .send({
            name: 'Mock name edited',
            ingredients: 'Mock ingredients edited',
            preparation: 'Mock preparation edited',
          });
      });

      it('1 - retorna com código de status "200"', () => {
        expect(response).to.have.status(200);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - o body tem o campo "name"', () => {
        expect(response.body).to.have.property('name');
      });

      it('4 - o body tem o campo "ingredients"', () => {
        expect(response.body).to.have.property('ingredients');
      });

      it('5 - o body tem o campo "preparation"', () => {
        expect(response.body).to.have.property('preparation');
      });

      it('6 - o body tem o campo "userId"', () => {
        expect(response.body).to.have.property('userId');
      });

      it('7 - o body tem o campo "_id"', () => {
        expect(response.body).to.have.property('_id');
      });

      it('8 - a receita deve ter sido atualizado', () => {
        expect(response.body).to.not.be.deep.equal(VALID_RECIPE);
      });
    });

    describe('3 - Testa se retorna um erro ao editar uma receita sem o token', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        await chai.request(server).post('/users').send({
          name: 'admin user',
          email: 'admin@email.com',
          password: 'adminuserpassword',
          role: 'admin',
        });

        const token = await chai
          .request(server)
          .post('/login')
          .send({ email: 'admin@email.com', password: 'adminuserpassword' })
          .then((response) => response.body.token);

        const recipeId = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE)
          .then((response) => response.body.recipe._id);

        response = await chai.request(server).put(`/recipes/${recipeId}`).send({
          name: 'Mock name edited',
          ingredients: 'Mock ingredients edited',
          preparation: 'Mock preparation edited',
        });
      });

      it('1 - retorna com código de status "401"', () => {
        expect(response).to.have.status(401);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - retorna um body com a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('4 - a propriedade "message" tem o valor "missing auth token"', () => {
        expect(response.body.message).to.be.equal('missing auth token');
      });
    });

    describe('4 - Testa se retorna um erro ao editar uma receita com token inválido', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        await chai.request(server).post('/users').send({
          name: 'admin user',
          email: 'admin@email.com',
          password: 'adminuserpassword',
          role: 'admin',
        });

        const token = await chai
          .request(server)
          .post('/login')
          .send({ email: 'admin@email.com', password: 'adminuserpassword' })
          .then((response) => response.body.token);

        const recipeId = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE)
          .then((response) => response.body.recipe._id);

        response = await chai
          .request(server)
          .put(`/recipes/${recipeId}`)
          .set('authorization', `a${token}`)
          .send({
            name: 'Mock name edited',
            ingredients: 'Mock ingredients edited',
            preparation: 'Mock preparation edited',
          });
      });

      it('1 - retorna com código de status "401"', () => {
        expect(response).to.have.status(401);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - retorna um body com a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('4 - a propriedade "message" tem o valor "jwt malformed"', () => {
        expect(response.body.message).to.be.equal('jwt malformed');
      });
    });
  });

  describe('Testa a exclusão de uma receita específica', () => {
    describe('1 - Testa se remove a receita estando autenticado com sucesso', () => {
      let response;
      let getDeleted;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});
        await usersCollection.insertOne(VALID_LOGIN);

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        const token = await chai
          .request(server)
          .post('/login')
          .send(VALID_LOGIN)
          .then((response) => response.body.token);

        const recipeId = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE)
          .then((response) => response.body.recipe._id);

        response = await chai
          .request(server)
          .delete(`/recipes/${recipeId}`)
          .set('authorization', token);

        getDeleted = await chai.request(server).get(`/recipes/${recipeId}`);
      });

      it('1 - retorna com código de status "204"', () => {
        expect(response).to.have.status(204);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.empty;
      });

      it('3 - retorna um objeto de erro se buscar a receita removida', () => {
        expect(getDeleted.body).to.be.an('object');
        expect(getDeleted.body.message).to.be.equal('recipe not found');
      });
    });

    describe('2 - Testa se remove a receita estando autenticado com sucesso e tendo "role" com valor "admin"', () => {
      let response;
      let getDeleted;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        await chai.request(server).post('/users').send({
          name: 'admin user',
          email: 'admin@email.com',
          password: 'adminuserpassword',
          role: 'admin',
        });

        const token = await chai
          .request(server)
          .post('/login')
          .send({ email: 'admin@email.com', password: 'adminuserpassword' })
          .then((response) => response.body.token);

        const recipeId = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE)
          .then((response) => response.body.recipe._id);

        response = await chai
          .request(server)
          .delete(`/recipes/${recipeId}`)
          .set('authorization', token);

        getDeleted = await chai.request(server).get(`/recipes/${recipeId}`);
      });

      it('1 - retorna com código de status "204"', () => {
        expect(response).to.have.status(204);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.empty;
      });

      it('3 - retorna um objeto de erro se buscar a receita removida', () => {
        expect(getDeleted.body).to.be.an('object');
        expect(getDeleted.body.message).to.be.equal('recipe not found');
      });
    });

    describe('3 - Testa se retorna um erro ao editar uma receita sem o token', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        await chai.request(server).post('/users').send({
          name: 'admin user',
          email: 'admin@email.com',
          password: 'adminuserpassword',
          role: 'admin',
        });

        const token = await chai
          .request(server)
          .post('/login')
          .send({ email: 'admin@email.com', password: 'adminuserpassword' })
          .then((response) => response.body.token);

        const recipeId = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE)
          .then((response) => response.body.recipe._id);

        response = await chai.request(server).delete(`/recipes/${recipeId}`).send({
          name: 'Mock name edited',
          ingredients: 'Mock ingredients edited',
          preparation: 'Mock preparation edited',
        });
      });

      it('1 - retorna com código de status "401"', () => {
        expect(response).to.have.status(401);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - retorna um body com a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('4 - a propriedade "message" tem o valor "missing auth token"', () => {
        expect(response.body.message).to.be.equal('missing auth token');
      });
    });
  });

  describe('Testa a adição de uma imagem à uma receita específica', () => {
    describe('1 - Testa se adiciona a imagem à receita estando autenticado com sucesso e sendo o autor da receita', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});
        await usersCollection.insertOne(VALID_LOGIN);

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        const token = await chai
          .request(server)
          .post('/login')
          .send(VALID_LOGIN)
          .then((response) => response.body.token);

        const recipeId = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE)
          .then((response) => response.body.recipe._id);

        response = await chai
          .request(server)
          .put(`/recipes/${recipeId}/image`)
          .set('authorization', token)
          .attach('image', fs.readFileSync('src/uploads/ratinho.jpg'), 'ratinho.jpg');
      });

      it('1 - retorna com código de status "200"', () => {
        expect(response).to.have.status(200);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - o body tem o campo "name"', () => {
        expect(response.body).to.have.property('name');
      });

      it('4 - o body tem o campo "ingredients"', () => {
        expect(response.body).to.have.property('ingredients');
      });

      it('5 - o body tem o campo "preparation"', () => {
        expect(response.body).to.have.property('preparation');
      });

      it('6 - o body tem o campo "userId"', () => {
        expect(response.body).to.have.property('userId');
      });

      it('7 - o body tem o campo "image"', () => {
        expect(response.body).to.have.property('image');
      });
    });

    describe('2 - Testa se edita a receita estando autenticado com sucesso e tendo "role" com valor "admin"', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        await chai.request(server).post('/users').send({
          name: 'admin user',
          email: 'admin@email.com',
          password: 'adminuserpassword',
          role: 'admin',
        });

        const token = await chai
          .request(server)
          .post('/login')
          .send({ email: 'admin@email.com', password: 'adminuserpassword' })
          .then((response) => response.body.token);

        const recipeId = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE)
          .then((response) => response.body.recipe._id);

        response = await chai
          .request(server)
          .put(`/recipes/${recipeId}/image`)
          .set('authorization', token)
          .attach('image', fs.readFileSync('src/uploads/ratinho.jpg'), 'ratinho.jpg');
      });

      it('1 - retorna com código de status "200"', () => {
        expect(response).to.have.status(200);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - o body tem o campo "name"', () => {
        expect(response.body).to.have.property('name');
      });

      it('4 - o body tem o campo "ingredients"', () => {
        expect(response.body).to.have.property('ingredients');
      });

      it('5 - o body tem o campo "preparation"', () => {
        expect(response.body).to.have.property('preparation');
      });

      it('6 - o body tem o campo "userId"', () => {
        expect(response.body).to.have.property('userId');
      });

      it('7 - o body tem o campo "image"', () => {
        expect(response.body).to.have.property('image');
      });
    });

    describe('3 - Testa se retorna um erro ao editar uma receita sem o token', () => {
      let response;

      before(async () => {
        const usersCollection = connectionMock.db('Cookmaster').collection('users');
        await usersCollection.deleteMany({});

        const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
        await recipesCollection.deleteMany({});

        await chai.request(server).post('/users').send({
          name: 'admin user',
          email: 'admin@email.com',
          password: 'adminuserpassword',
          role: 'admin',
        });

        const token = await chai
          .request(server)
          .post('/login')
          .send({ email: 'admin@email.com', password: 'adminuserpassword' })
          .then((response) => response.body.token);

        const recipeId = await chai
          .request(server)
          .post('/recipes')
          .set('authorization', token)
          .send(VALID_RECIPE)
          .then((response) => response.body.recipe._id);

        response = await chai
          .request(server)
          .put(`/recipes/${recipeId}/image`)
          .attach('image', fs.readFileSync('src/uploads/ratinho.jpg'), 'ratinho.jpg');
      });

      it('1 - retorna com código de status "401"', () => {
        expect(response).to.have.status(401);
      });

      it('2 - retorna um objeto no body', () => {
        expect(response.body).to.be.an('object');
      });

      it('3 - retorna um body com a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('4 - a propriedade "message" tem o valor "missing auth token"', () => {
        expect(response.body.message).to.be.equal('missing auth token');
      });
    });
  });
});
