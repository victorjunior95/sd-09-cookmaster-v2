const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../api/app');
const { getConnection } = require('./connection');
const { MongoClient } = require('mongodb');

const { expect } = chai;
chai.use(chaiHttp);

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

const newRecipe = [
  {
    name: 'batata frita',
    ingredients: 'batata',
    preparation: 'aquecer na airfryer',
  },
];

describe('Testing route GET /recipes', () => {
  describe('When searching for all the recipes', () => {
    let response;
    before(async () => {
      const connection = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connection);
      await connection.db('Cookmaster').collection('recipes').insertMany(newRecipes);
      response = await chai.request(app).get('/recipes');
    });
    after(async () => {
      MongoClient.connect.restore();
      await connection.db('Cookmaster').collection('recipes').deleteMany({});
    });
  
    it('should send a 200 status code', () => {
      expect(response).to.have.status(200);
    });
    it('should be an array', () => {
      expect(response.body).to.be.a('array');
    });
    it('should contain 3 elements', () => {
      expect(response.body.length).to.equal(3);
    });
    it('the elements should be objects', () => {
      expect(response.body[0]).to.be.a('object');
      expect(response.body[1]).to.be.a('object');
      expect(response.body[2]).to.be.a('object');
    });
    it('each element should have the correct properties', () => {
      expect(response.body[0]).to.have.keys('_id', 'name', 'ingredients', 'preparation');
      expect(response.body[1]).to.have.keys('_id', 'name', 'ingredients', 'preparation');
      expect(response.body[2]).to.have.keys('_id', 'name', 'ingredients', 'preparation');
    });
  });
});

