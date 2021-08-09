const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../api/app');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing route GET /recipes', () => {
  const newRecipes = [
    {
      name: 'mousse de limão',
      ingredients: 'suco de limão, leite condensado e creme de leite',
      preparation: 'bater tudo no liquidificador por 5 minutos e gelar até endurecer',
    },
    {
      name: 'brigadeiro',
      ingredients: 'achocolatado em pó, leite condensado e manteiga',
      preparation: 'cozinhar o achocolatado, o leite condensado e uma colher de manteiga até desgrudar da panela',
    },
    {
      name: 'batata frita',
      ingredients: 'batata',
      preparation: 'aquecer na airfryer',
    },
  ];

  describe('When searching for all the recipes', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').insertMany(newRecipes);
      response = await chai.request(server).get('/recipes');
    });

    after(async () => {
      MongoClient.connect.restore();
      const URLMock = DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      await DBServer.stop();
    });
  
    it('should send a 200 status code', () => {
      expect(response).to.have.status(200);
    });
    it('should be an array', () => {
      expect(response.body).to.be.an('array');
    });
    it('should contain 3 elements', () => {
      expect(response.body.length).to.equal(3);
    });
    it('the elements should be objects', () => {
      expect(response.body[0]).to.be.an('object');
      expect(response.body[1]).to.be.an('object');
      expect(response.body[2]).to.be.an('object');
    });
    it('each element should have the correct properties', () => {
      expect(response.body[0]).to.have.keys('_id', 'name', 'ingredients', 'preparation');
      expect(response.body[1]).to.have.keys('_id', 'name', 'ingredients', 'preparation');
      expect(response.body[2]).to.have.keys('_id', 'name', 'ingredients', 'preparation');
    });
  });

  describe('Testing route GET /recipes/:id', () => {
    const newRecipe = [
      {
        name: 'batata frita',
        ingredients: 'batata',
        preparation: 'aquecer na airfryer',
      },
    ];

    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('recipes').insertOne(newRecipe);
      recipes = await chai.request(server).get('/recipes/');
      response = await chai.request(server)
        .get(`/recipes/${recipes.body[0]._id}`);
    });

    after(async () => {
      MongoClient.connect.restore();
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
    });

    it('should send a 200 status code', () => {
      expect(response).to.have.status(200);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have the right properties containing the new admin information', () => {
      expect(response.body.name).to.be.a('string');
      expect(response.body.ingredients).to.be.a('string');
      expect(response.body.preparation).to.be.a('string');
    });
  })
});

