const chai = require('chai');
const sinon = require('sinon');
const chaihttp = require('chai-http');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaihttp);
const { expect } = chai;

const recipeToBeRegistered = { name: 'estrogonoff de carne', ingredients: 'carne, creme de leite', preparation: 'cozinhar tudo por 10min' };
const validUserRegister = { name: "Albert Einstein", email: 'aeinstein@email.com', password: '123456' };
const validUser = { email: 'aeinstein@email.com', password: '123456' };

describe('/GET - GET ONE RECIPE - return a recipe of data base;', () => {
  describe('Should return a recipe', () => {
    let connectionMock;
    let response;
    before(async () => {
      const DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
      connectionMock = await MongoClient.connect(URLMock, OPTIONS);
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').insertOne(recipeToBeRegistered);
      responseRecipesList = await chai.request(server).get('/recipes/');
      response = await chai
        .request(server)
        .get(`/recipes/${responseRecipesList.body[0]._id}`)
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
    });

    it('Should return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Should return an object with "_id", "name", "ingredients", "prepration", "userId"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body._id).to.exist;
      expect(response.body._id.length).to.equal(24);
      expect(response.body.name).to.exist;
      expect(response.body.name).to.be.an('string');
      expect(response.body.ingredients).to.exist;
      expect(response.body.ingredients).to.be.an('string');
      expect(response.body.preparation).to.exist;
      expect(response.body.preparation).to.be.an('string');
    });
  });
});
