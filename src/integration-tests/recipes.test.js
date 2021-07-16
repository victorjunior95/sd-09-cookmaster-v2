const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const fs = require('fs').promises;
const { MongoClient, ObjectId } = require('mongodb');
const { expect } = chai;
chai.use(chaiHttp);

const server = require('../api/app');
const getConnection = require('./connectionMock');

const validRegisteredAdmin = {
  _id: ObjectId("60f0eefd90813958281cadfd"),
  name: "admin",
  email: "root@email.com",
  password: "admin",
  role: "admin"
};

const validRegisteredUser = {
  _id: ObjectId("60f18a519c696e3c700d93c9"),
  name: 'Thor Odinson',
  email: 'thorodinson@email.com',
  password: 'asgard123',
  role: 'user'
};

const otherValidRegisteredUser = {
  _id: ObjectId("60f1dbf462d6b8e931e70877"),
  name: 'Loki',
  email: 'originalprankster@email.com',
  password: 'jotunsneverdie',
  role: 'user'
};

const validRegisteredRecipe = {
  name: "Hidromel de Odin",
  ingredients: "Segredo de Odin",
  preparation: "Pergunta pro Odin",
  userId: "60f18a519c696e3c700d93c9",
  _id: ObjectId("60f1cadc9e36a1af7ab4d766")
}

const validRecipeNewInfos = {
  name: "Hidromel de Odin",
  ingredients: "água, mel e levedura",
  preparation: "Fermente tudo dentro de um barril de carvalho",
};

const userCredentials = {
  email: 'thorodinson@email.com',
  password: 'asgard123'
};

const otherUserCredentials = {
  email: 'originalprankster@email.com',
  password: 'jotunsneverdie'
};

const adminCredentials = {
  email: 'root@email.com',
  password: 'admin'
};

const validRecipe = {
  name: "Hidromel de Odin",
  ingredients: "Segredo de Odin",
  preparation: "Pergunta pro Odin"
};

const recipeWithoutName = {
  ingredients: "Segredo de Odin",
  preparation: "Pergunta pro Odin"
};

const recipeWithoutIngredients = {
  name: "Hidromel de Odin",
  preparation: "Pergunta pro Odin"
};

const recipeWithoutPreparation = {
  name: "Hidromel de Odin",
  ingredients: "Segredo de Odin"
};

describe('POST /recipes', () => {

  describe('Tenta adicionar receita sem o campo name', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);

      const token = await chai
        .request(server)
        .post('/login')
        .send(userCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(recipeWithoutIngredients);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });

  });

  describe('Tenta adicionar receita sem o campo ingredients', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);

      const token = await chai
        .request(server)
        .post('/login')
        .send(userCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(recipeWithoutName);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });

  });

  describe('Tenta adicionar receita sem o campo preparation', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);

      const token = await chai
        .request(server)
        .post('/login')
        .send(userCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(recipeWithoutPreparation);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });

  });

  describe('Tenta adicionar uma receita sem estar autenticado', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);

      response = await chai
        .request(server)
        .post('/recipes')
        .set('authorization', 'umTokenAleatorioNaoExistente')
        .send(recipeWithoutPreparation);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "jwt malformed"', () => {
      expect(response.body.message).to.be.equal('jwt malformed');
    });

  });

  describe('Adiciona uma receita com sucesso', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);

      const token = await chai
        .request(server)
        .post('/login')
        .send(userCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(validRecipe);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });

    it('o objeto "recipe" possui a propriedade "_id"', () => {
      expect(response.body.recipe).to.have.property('_id');
    });

    it('o objeto "recipe" possui a propriedade "name"', () => {
      expect(response.body.recipe).to.have.property('name');
    });

    it('o objeto "recipe" possui a propriedade "ingredients"', () => {
      expect(response.body.recipe).to.have.property('ingredients');
    });

    it('o objeto "recipe" possui a propriedade "preparation"', () => {
      expect(response.body.recipe).to.have.property('preparation');
    });

    it('o objeto "recipe" possui a propriedade "userId"', () => {
      expect(response.body.recipe).to.have.property('userId');
    });

  });

});

describe('GET /recipes', () => {

  describe('Lista todas as receitas sem autenticacao', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      response = await chai.request(server).get('/recipes')
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
    
    it('retorna um array', () => {
      expect(response.body).to.be.a('array');
    });

    it('o array tem "length" 1', () => {
      expect(response.body).to.be.length(1);
    });

    it('retorna um array com um objeto', () => {
      expect(response.body[0]).to.be.a('object');
    });
    
  });

  describe('Lista todas as receitas com autenticacao', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);
      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      const token = await chai
        .request(server)
        .post('/login')
        .send(userCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .get('/recipes')
        .set('authorization', token)
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
    
    it('retorna um array', () => {
      expect(response.body).to.be.a('array');
    });

    it('o array tem "length" 1', () => {
      expect(response.body).to.be.length(1);
    });

    it('retorna um array com um objeto', () => {
      expect(response.body[0]).to.be.a('object');
    });

  });

})

describe('GET /recipes/:id', () => {

  describe('Tenta buscar uma receita que nao existe', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      response = await chai
        .request(server)
        .get('/recipes/60f1d24c09770acb14d6888c')
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 404', () => {
      expect(response).to.have.status(404);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "recipe not found"', () => {
      expect(response.body.message).to.be.equal('recipe not found');
    });
    
  });

  describe('Lista uma receita atraves do Id sem autenticacao', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      response = await chai
        .request(server)
        .get('/recipes/60f1cadc9e36a1af7ab4d766')
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body).to.have.property('_id');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body).to.have.property('name');
    });

    it('o objeto possui a propriedade "ingredients"', () => {
      expect(response.body).to.have.property('ingredients');
    });

    it('o objeto possui a propriedade "preparation"', () => {
      expect(response.body).to.have.property('preparation');
    });

    it('o objeto possui a propriedade "userId"', () => {
      expect(response.body).to.have.property('userId');
    });

  });

  describe('Lista uma receita atraves do Id com autenticacao', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);
      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      const token = await chai
        .request(server)
        .post('/login')
        .send(userCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .get('/recipes/60f1cadc9e36a1af7ab4d766')
        .set('authorization', token)
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body).to.have.property('_id');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body).to.have.property('name');
    });

    it('o objeto possui a propriedade "ingredients"', () => {
      expect(response.body).to.have.property('ingredients');
    });

    it('o objeto possui a propriedade "preparation"', () => {
      expect(response.body).to.have.property('preparation');
    });

    it('o objeto possui a propriedade "userId"', () => {
      expect(response.body).to.have.property('userId');
    });

  });

});

describe('PUT /recipes/:id', () => {

  describe('Tenta editar uma receita sem autenticacao', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      response = await chai
        .request(server)
        .put('/recipes/60f1cadc9e36a1af7ab4d766')
        .send(validRecipeNewInfos);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });

  });

  describe('Tenta editar uma receita com autenticacao invalida', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertMany([validRegisteredUser, otherValidRegisteredUser]);
      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      const token = await chai
        .request(server)
        .post('/login')
        .send(otherUserCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .put('/recipes/60f1cadc9e36a1af7ab4d766')
        .set('authorization', token)
        .send(validRecipeNewInfos);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });

  });

  describe('Edita uma receita com autenticacao', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);
      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      const token = await chai
        .request(server)
        .post('/login')
        .send(userCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .put('/recipes/60f1cadc9e36a1af7ab4d766')
        .set('authorization', token)
        .send(validRecipeNewInfos);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body).to.have.property('_id');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body).to.have.property('name');
    });

    it('o objeto possui a propriedade "ingredients"', () => {
      expect(response.body).to.have.property('ingredients');
    });

    it('o objeto possui a propriedade "preparation"', () => {
      expect(response.body).to.have.property('preparation');
    });

    it('o objeto possui a propriedade "userId"', () => {
      expect(response.body).to.have.property('userId');
    });

    it('o objeto deve ser diferente do anterior a edicao', () => {
      expect(response.body).not.to.be.equal(validRegisteredRecipe);
    });

  });

  describe('Edita uma receita com autenticacao de admin', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredAdmin);
      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      const token = await chai
        .request(server)
        .post('/login')
        .send(adminCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .put('/recipes/60f1cadc9e36a1af7ab4d766')
        .set('authorization', token)
        .send(validRecipeNewInfos);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body).to.have.property('_id');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body).to.have.property('name');
    });

    it('o objeto possui a propriedade "ingredients"', () => {
      expect(response.body).to.have.property('ingredients');
    });

    it('o objeto possui a propriedade "preparation"', () => {
      expect(response.body).to.have.property('preparation');
    });

    it('o objeto possui a propriedade "userId"', () => {
      expect(response.body).to.have.property('userId');
    });

    it('o objeto deve ser diferente do anterior a edicao', () => {
      expect(response.body).not.to.be.equal(validRegisteredRecipe);
    });

  });

});
/*
describe('DELETE /recipes/:id', () => {

  describe('Tenta excluir uma receita sem autenticacao', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      response = await chai
        .request(server)
        .delete('/recipes/60f1cadc9e36a1af7ab4d766')
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });

  });

  describe('Tenta excluir uma receita com autenticacao invalida', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertMany([validRegisteredUser, otherValidRegisteredUser]);
      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      const token = await chai
        .request(server)
        .post('/login')
        .send(otherUserCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .delete('/recipes/60f1cadc9e36a1af7ab4d766')
        .set('authorization', token);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });

  });

  describe('Exclui uma receita com autenticacao', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);
      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      const token = await chai
        .request(server)
        .post('/login')
        .send(userCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .delete('/recipes/60f1cadc9e36a1af7ab4d766')
        .set('authorization', token);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 204', () => {
      expect(response).to.have.status(204);
    });
    
    it('nao retorna nada no body', () => {
      expect(response.body).to.be.empty;
    });

  });

  describe('Exclui uma receita com autenticacao de admin', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredAdmin);
      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      const token = await chai
        .request(server)
        .post('/login')
        .send(adminCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .delete('/recipes/60f1cadc9e36a1af7ab4d766')
        .set('authorization', token);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 204', () => {
      expect(response).to.have.status(204);
    });
    
    it('nao retorna nada no body', () => {
      expect(response.body).to.be.empty;
    });

  });

});

describe('PUT /recipes/:id/image', () => {

  describe('Tenta adicionar uma imagem a receita sem autenticacao', () => {

    let response;

    before(async () => {
      const file = await fs.readFile('src/uploads/ratinho.jpg');
      response = await chai
        .request(server)
        .put('/recipes/60f1cadc9e36a1af7ab4d766/image')
        .attach('image', file, 'ratinho.jpg')
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });

  });

  describe('Tenta adicionar uma imagem a receita com autenticacao invalida', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertMany([validRegisteredUser, otherValidRegisteredUser]);
      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      const token = await chai
        .request(server)
        .post('/login')
        .send(otherUserCredentials)
        .then((response) => response.body.token);

      const file = await fs.readFile('src/uploads/ratinho.jpg');

      response = await chai
        .request(server)
        .put('/recipes/60f1cadc9e36a1af7ab4d766/image')
        .set('authorization', token)
        .attach('image', file, 'ratinho.jpg');
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });

  });

  describe('Adiciona uma imagem a receita com autenticacao', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);
      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      const token = await chai
        .request(server)
        .post('/login')
        .send(userCredentials)
        .then((response) => response.body.token);

      const file = await fs.readFile('src/uploads/ratinho.jpg');

      response = await chai
        .request(server)
        .put('/recipes/60f1cadc9e36a1af7ab4d766/image')
        .set('authorization', token)
        .attach('image', file, 'ratinho.jpg');
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body).to.have.property('_id');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body).to.have.property('name');
    });

    it('o objeto possui a propriedade "ingredients"', () => {
      expect(response.body).to.have.property('ingredients');
    });

    it('o objeto possui a propriedade "preparation"', () => {
      expect(response.body).to.have.property('preparation');
    });

    it('o objeto possui a propriedade "userId"', () => {
      expect(response.body).to.have.property('userId');
    });

    it('o objeto possui a propriedade "image"', () => {
      expect(response.body).to.have.property('image');
    });

  });

  describe('Adiciona uma imagem a receita com autenticacao de admin', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredAdmin);
      await connectionMock.db('Cookmaster').collection('recipes').insertOne(validRegisteredRecipe);

      const token = await chai
        .request(server)
        .post('/login')
        .send(adminCredentials)
        .then((response) => response.body.token);

      const file = await fs.readFile('src/uploads/ratinho.jpg');

      response = await chai
        .request(server)
        .put('/recipes/60f1cadc9e36a1af7ab4d766/image')
        .set('authorization', token)
        .attach('image', file, 'ratinho.jpg');
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body).to.have.property('_id');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body).to.have.property('name');
    });

    it('o objeto possui a propriedade "ingredients"', () => {
      expect(response.body).to.have.property('ingredients');
    });

    it('o objeto possui a propriedade "preparation"', () => {
      expect(response.body).to.have.property('preparation');
    });

    it('o objeto possui a propriedade "userId"', () => {
      expect(response.body).to.have.property('userId');
    });

    it('o objeto possui a propriedade "image"', () => {
      expect(response.body).to.have.property('image');
    });

  });

});
*/