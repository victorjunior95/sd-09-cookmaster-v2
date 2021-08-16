const chai = require('chai');
const sinon = require('sinon');
const chaihttp = require('chai-http');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaihttp);
const { expect } = chai;

const recipesToBeRegistered = [
  { name: 'estrogonoff de carne', ingredients: 'carne, creme de leite', preparation: 'cozinhar tudo por 10min' },
  { name: 'milho na manteiga', ingredients: 'milho, manteiga e sal', preparation: 'cozinhar o milho por 20min, colocar sal e manteiga a gosto' },
  { name: 'vitamina de abacate', ingredients: 'abacate, leite, gelo, açucar', preparation: 'adicionar tudo ao liquidificador e adoçar a gosto' },
]

describe('/GET - GET ALL RECIPES - return a list off all recipes on data base;', () => {
  describe('Should return an array list of all recipes', () => {
    let connectionMock;
    let response;
    before(async () => {
      const DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
      connectionMock = await MongoClient.connect(URLMock, OPTIONS);
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').insertMany(recipesToBeRegistered);
      response = await chai.request(server).get('/recipes/');
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
    });

    it('Should return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Should return an array with three elements', () => {
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(3);
    });

    it('Should have the array with recipes, who was previously registered', () => {
      expect(response.body[0].name).to.be.equal('estrogonoff de carne');
      expect(response.body[1].name).to.be.equal('milho na manteiga');
      expect(response.body[2].name).to.be.equal('vitamina de abacate');
    });

    it('Should have the propeties, "_id", "name", "ingredients", "preparation", "userId"', () => {
      expect(response.body[0]._id).to.exist;
      expect(response.body[0]._id.length).to.equal(24);
      expect(response.body[0].name).to.exist;
      expect(response.body[0].name).to.be.an('string');
      expect(response.body[0].ingredients).to.exist;
      expect(response.body[0].ingredients).to.be.an('string');
      expect(response.body[0].preparation).to.exist;
      expect(response.body[0].preparation).to.be.an('string');
    });
  });
});