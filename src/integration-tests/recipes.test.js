const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const connection = require('../api/connection');

chai.use(chaiHttp);

const app = require('../api/app');
const { getConnection, DBServer } = require('./connectionMock');
const { MongoClient } = require('mongodb');

const { expect } = chai;

describe('RECIPES INTEGRATIONS TESTS', () => {
  before(async () => {
    const connectionMock = await getConnection()
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  
  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('/recipes | POST', () => {
    describe('when name, ingredients and preparation is not declared', () => {
      let response;
      
      before(async () => {
        response = await chai.request(app).post('/recipes').send({});
      });
  
      it('expect HTTP STATUS = 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('expect response body is an object', () => {
        expect(response.body).to.be.an('object');
      });
  
      it('expect body have property message', () => {
        expect(response.body).to.have.property('message')
      });
  
      it('expect body message is a correct message', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.')
      });
    });
  
    describe('when name is not declared', () => {
      let response;
      
      before(async () => {
        response = await chai
          .request(app).post('/recipes').send({ ingredients: 'test', preparation: 'test' });
      });
  
      it('expect HTTP STATUS = 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('expect response body is an object', () => {
        expect(response.body).to.be.an('object');
      });
  
      it('expect body have property message', () => {
        expect(response.body).to.have.property('message')
      });
  
      it('expect body message is a correct message', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.')
      });
    });
  
    describe('when ingredients is not declared', () => {
      let response;
      
      before(async () => {
        response = await chai
          .request(app).post('/recipes').send({ name: 'test', preparation: 'test' });
      });
  
      it('expect HTTP STATUS = 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('expect response body is an object', () => {
        expect(response.body).to.be.an('object');
      });
  
      it('expect body have property message', () => {
        expect(response.body).to.have.property('message')
      });
  
      it('expect body message is a correct message', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.')
      });
    });
  
    describe('when preparation is not declared', () => {
      let response;
      
      before(async () => {
        response = await chai
          .request(app).post('/recipes').send({ name: 'test', ingredients: 'test' });
      });
  
      it('expect HTTP STATUS = 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('expect response body is an object', () => {
        expect(response.body).to.be.an('object');
      });
  
      it('expect body have property message', () => {
        expect(response.body).to.have.property('message')
      });
  
      it('expect body message is a correct message', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.')
      });
    });
  
    describe('when jwt is invalid', () => {
      let response;
      
      before(async () => {
        response = await chai
          .request(app).post('/recipes')
          .set('authorization', 'INVALIDTOKEN_ADJALKDJAD__SASKJDALKDJA.DADASD')
          .send({ name: 'test', ingredients: 'test', preparation: 'test' });
      });
  
      it('expect HTTP STATUS = 401', () => {
        expect(response).to.have.status(401);
      });
  
      it('expect response body is an object', () => {
        expect(response.body).to.be.an('object');
      });
  
      it('expect body have property message', () => {
        expect(response.body).to.have.property('message')
      });
  
      it('expect body message is a correct message', () => {
        expect(response.body.message).to.be.equal('jwt malformed')
      });
    });
  
    describe('when submit recipe with success', () => {
      let response;
      
      before(async () => {
        const db = await connection();
        const newUser = { role: 'user', email: 'usertest@gmail.com', password: 'usertest1235' };
  
        await db.collection('users').insertOne(newUser);
  
        const { body: { token } } = await chai.request(app)
          .post('/login')
          .send({ email: 'usertest@gmail.com', password: 'usertest1235' });
  
        response = await chai
          .request(app)
          .post('/recipes')
          .set('authorization', token)
          .send({ name: 'test', ingredients: 'test', preparation: 'test' });
      });
  
      it('expect HTTP STATUS = 201', () => {
        expect(response).to.have.status(201);
      });
  
      it('expect response body is an object', () => {
        expect(response.body).to.be.an('object');
      });
  
      it('expect body have property recipe', () => {
        expect(response.body).to.have.property('recipe')
      });
  
      it('expect recipe have correct properties', () => {
        expect(response.body.recipe).to.have.property('_id');
        expect(response.body.recipe).to.have.property('userId');
        expect(response.body.recipe).to.have.property('name');
        expect(response.body.recipe).to.have.property('ingredients');
        expect(response.body.recipe).to.have.property('preparation');
      });
    });
  });

  describe('/recipes | GET', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .get('/recipes')
    });

    it('expect HTTP STATUS = 200', () => {
      expect(response).to.have.status(200);
    });

    it('expect response body is an array', () => {
      expect(response.body).to.be.an('array');
    });
  });

  describe('/recipes/:id | GET', () => {
    let response;

    before(async () => {
      const db = await connection();
      const newRecipe = { name: 'test', ingredients: 'test', preparation: 'test' };
      const { ops } = await db.collection('recipes').insertOne(newRecipe);
      const validId = ops[0]['_id'];

      response = await chai.request(app)
        .get(`/recipes/${validId}`)
    });
    it('expect HTTP STATUS = 200', () => {
      expect(response).to.have.status(200);
    });

    it('expect response body is an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('expect body have correct properties', () => {
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('preparation');
      expect(response.body).to.have.property('ingredients');
    });
  });

});
