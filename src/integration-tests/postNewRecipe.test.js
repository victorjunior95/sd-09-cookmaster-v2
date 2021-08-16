const chai = require('chai');
const sinon = require('sinon');
const chaihttp = require('chai-http');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaihttp);
const { expect } = chai;

const validUserRegister = { name: "Albert Einstein", email: 'aeinstein@email.com', password: '123456' };
const validUser = { email: 'aeinstein@email.com', password: '123456' };
const validRecipe = { name: 'pipoca com amor', ingredients: 'pipoca, sazom', preparation: '5minutos no fogo' }
const invalidRecipes = {
  recipe0: { name: '', ingredients: 'pipoca, sazom', preparation: '5minutos no fogo' },
  recipe1: { name: 'pipoca com amor', ingredients: '', preparation: '5minutos no fogo' },
  recipe2: { name: 'pipoca com amor', ingredients: 'pipoca, sazom', preparation: '' },
}

describe('/POST - ADD NEW RECIPE', () => {
  describe('When the request was rejected, without a valid Token on headers', () => {
    describe('Property "authorization" with empty value,in the headers of request ', () => {
      let response;
      before(async () => {
        response = await chai
          .request(server)
          .post('/recipes/')
          .set('authorization', '')
          .send(validRecipe);
      });

      it('Should return status 401', () => {
        expect(response).to.have.status(401);
      });

      it('Should return an object, with property "message"', () => {
        expect(response.body).to.be.an('object').with.property('message');
      });

      it('Should contain the message "missing auth token"', () => {
        expect(response.body.message).to.be.equal('missing auth token');
      });
    });

    describe('Missing property "authorization" of the recipe in the headers of request ', () => {
      let response;
      before(async () => {
        response = await chai
          .request(server)
          .post('/recipes/')
          .send(validRecipe);
      });

      it('Should return status 401', () => {
        expect(response).to.have.status(401);
      });

      it('Should return an object, with property "message"', () => {
        expect(response.body).to.be.an('object').with.property('message');
      });

      it('Should contain the message "missing auth token"', () => {
        expect(response.body.message).to.be.equal('missing auth token');
      });
    });

    describe('Headers of request, property "authorization" with invalid token,  ', () => {
      let connectionMock;
      let response;
      before(async () => {
        const DBServer = await MongoMemoryServer.create();
        const URLMock = DBServer.getUri();
        const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
        connectionMock = await MongoClient.connect(URLMock, OPTIONS);
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users').insertOne(validUserRegister);


        response = await chai
          .request(server)
          .post('/recipes/')
          .set('authorization', 'THIS_IS_A_INVALID_TOKEN')
          .send(validRecipe);
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      });

      it('Should return status 401', () => {
        expect(response).to.have.status(401);
      });

      it('Should return an object, with property "message"', () => {
        expect(response.body).to.be.an('object').with.property('message');
      });

      it('Should contain the message "jwt malformed"', () => {
        expect(response.body.message).to.be.equal('jwt malformed');
      });
    });
  });

  describe('When the request was rejected, with incorrect object of recipe on the body of request', () => {
    describe('Missing property "name" of the recipe in body of request ', () => {
      let connectionMock;
      let response;
      before(async () => {
        const DBServer = await MongoMemoryServer.create();
        const URLMock = DBServer.getUri();
        const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
        connectionMock = await MongoClient.connect(URLMock, OPTIONS);
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users').insertOne(validUserRegister);

        responseToken = await chai.request(server).post('/login/').send(validUser);
        response = await chai
          .request(server)
          .post('/recipes/')
          .set('authorization', responseToken.body.token)
          .send(invalidRecipes.recipe0);
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      });

      it('Should return status 400', () => {
        expect(response).to.have.status(400);
      });

      it('Should return an object, with property "message"', () => {
        expect(response.body).to.be.an('object').with.property('message');
      });

      it('Should contain the message "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('Missing property "ingredients" of the recipe in body of request ', () => {
      let connectionMock;
      let response;
      before(async () => {
        const DBServer = await MongoMemoryServer.create();
        const URLMock = DBServer.getUri();
        const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
        connectionMock = await MongoClient.connect(URLMock, OPTIONS);
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users').insertOne(validUserRegister);

        responseToken = await chai.request(server).post('/login/').send(validUser);
        response = await chai
          .request(server)
          .post('/recipes/')
          .set('authorization', responseToken.body.token)
          .send(invalidRecipes.recipe1);
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      });

      it('Should return status 400', () => {
        expect(response).to.have.status(400);
      });

      it('Should return an object, with property "message"', () => {
        expect(response.body).to.be.an('object').with.property('message');
      });

      it('Should contain the message "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('Missing property "preparation" of the recipe in body of request ', () => {
      let connectionMock;
      let response;
      before(async () => {
        const DBServer = await MongoMemoryServer.create();
        const URLMock = DBServer.getUri();
        const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
        connectionMock = await MongoClient.connect(URLMock, OPTIONS);
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users').insertOne(validUserRegister);

        responseToken = await chai.request(server).post('/login/').send(validUser);
        response = await chai
          .request(server)
          .post('/recipes/')
          .set('authorization', responseToken.body.token)
          .send(invalidRecipes.recipe2);
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      });

      it('Should return status 400', () => {
        expect(response).to.have.status(400);
      });

      it('Should return an object, with property "message"', () => {
        expect(response.body).to.be.an('object').with.property('message');
      });

      it('Should contain the message "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });
  });
});
describe('When the request was accepted, will return the recipe object created', () => {

  describe('Return the recipe object created with "recipes" as property', () => {
    describe('The recipe object returned has the properties, "name", "ingredients", "preparation", "userId", "_id"', () => {
      let connectionMock;
      let response;
      before(async () => {
        const DBServer = await MongoMemoryServer.create();
        const URLMock = DBServer.getUri();
        const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
        connectionMock = await MongoClient.connect(URLMock, OPTIONS);
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users').insertOne(validUserRegister);

        responseToken = await chai.request(server).post('/login/').send(validUser);
        response = await chai
          .request(server)
          .post('/recipes/')
          .set('authorization', responseToken.body.token)
          .send(validRecipe);
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteMany({});
        await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      });

      it('Should return status 201', () => {
        expect(response).to.have.status(201);
      });

      it('Should return an object, with property "recipe"', () => {
        expect(response.body).to.be.an('object').with.property('recipe');
      });

      it('Should contain the property "name", and his value "pipoca com amor"', () => {
        expect(response.body.recipe).to.have.property('name');
        expect(response.body.recipe.name).to.equal('pipoca com amor');
      });

      it('Should contain the property "ingredients", and his value "pipoca, sazom"', () => {
        expect(response.body.recipe).to.have.property('ingredients');
        expect(response.body.recipe.ingredients).to.equal('pipoca, sazom');
      });

      it('Should contain the property "preparation", and his value "pipoca, sazom"', () => {
        expect(response.body.recipe).to.have.property('preparation');
        expect(response.body.recipe.preparation).to.equal('5minutos no fogo');
      });

      it('Should contain the property "userId", and his value "pipoca, sazom"', () => {
        expect(response.body.recipe).to.have.property('userId');
        expect(response.body.recipe.userId.length).to.equal(24);
      });

      it('Should contain the property "_id", and his value "pipoca, sazom"', () => {
        expect(response.body.recipe).to.have.property('_id');
        expect(response.body.recipe._id.length).to.equal(24);
      });
    });
  });
});
