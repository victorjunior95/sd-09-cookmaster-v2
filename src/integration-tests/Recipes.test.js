const { getConnection, MongoClient, DBServer } = require('./connectionMock');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /recipes', () => {
  describe('1 - When a recipe is successfully created', () => {
    
    let resp;
    let id;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { body: { user: { _id } } } = await chai.request(server)
        .post('/users')
        .send({ name: 'test', email: 'test@email.com', password: 'test@123' });
      
      id = _id;

      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send({ email: 'test@email.com', password: 'test@123' });

      resp = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'chicken',
          ingredients: 'rice, beans, chicken',
          preparation: '10 minutes on oven',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 201', () => {
      expect(resp).to.have.status(201);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns an object with specific properties', () => {
      expect(resp.body).to.have.property('recipe')
      expect(resp.body.recipe).to.have.property('_id');
      expect(resp.body.recipe).to.have.property('name');
      expect(resp.body.recipe).to.have.property('ingredients');
      expect(resp.body.recipe).to.have.property('preparation');
      expect(resp.body.recipe).to.have.property('userId');
    });

    it('Returns an object with specific values', () => {
      expect(resp.body.recipe.name).to.be.equal('chicken');
      expect(resp.body.recipe.ingredients).to.be.equal('rice, beans, chicken');
      expect(resp.body.recipe.preparation).to.be.equal('10 minutes on oven');
      expect(resp.body.recipe.userId).to.be.equal(id);
    });

  });
  describe('2 - When the name of the recipe is not informed', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({ name: 'test', email: 'test@email.com', password: 'test@123' });

      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send({ email: 'test@email.com', password: 'test@123' });

      resp = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          ingredients: 'rice, beans, chicken',
          preparation: '10 minutes on oven',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 400', () => {
      expect(resp).to.have.status(400);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns an object with message property', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns an object with value "Invalid entries. Try again."', () => {
      expect(resp.body.message).to.be.equal('Invalid entries. Try again.');
    });

  });
  describe('3 - When the ingredients of the recipe is not informed', () => {
    
    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({ name: 'test', email: 'test@email.com', password: 'test@123' });

      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send({ email: 'test@email.com', password: 'test@123' });

      resp = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: "chicken",
          preparation: '10 minutes on oven',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 400', () => {
      expect(resp).to.have.status(400);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns an object with message property', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns an object with value "Invalid entries. Try again."', () => {
      expect(resp.body.message).to.be.equal('Invalid entries. Try again.');
    });

  });
  describe('4 - When the recipe preparation is not informed', () => {
        
    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({ name: 'test', email: 'test@email.com', password: 'test@123' });

      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send({ email: 'test@email.com', password: 'test@123' });

      resp = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: "chicken",
          ingredients: 'rice, beans, chicken',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 400', () => {
      expect(resp).to.have.status(400);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns an object with message property', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns an object with value "Invalid entries. Try again."', () => {
      expect(resp.body.message).to.be.equal('Invalid entries. Try again.');
    });

  });
  describe('5 - When the token provided is invalid', () => {
        
    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({ name: 'test', email: 'test@email.com', password: 'test@123' });

      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send({ email: 'test@email.com', password: 'test@123' });

      resp = await chai.request(server)
        .post('/recipes')
        .set('authorization', 'invalid_token')
        .send({
          name: 'chicken',
          ingredients: 'rice, beans, chicken',
          preparation: '10 minutes on oven',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 401', () => {
      expect(resp).to.have.status(401);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns an object with message property', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns an object with value "jwt malformed"', () => {
      expect(resp.body.message).to.be.equal('jwt malformed');
    });

  });
});

describe('GET /recipes', () => {
  describe('1 - When there are registered recipes', () => {

    let resp;
    let id;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { body: { user: { _id } } } = await chai.request(server)
        .post('/users')
        .send({ name: 'test', email: 'test@email.com', password: 'test@123' });
      
      id = _id;

      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send({ email: 'test@email.com', password: 'test@123' });

      await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'chicken',
          ingredients: 'rice, beans, chicken',
          preparation: '10 minutes on oven',
        });
      
      resp = await chai.request(server)
        .get('/recipes');
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 200', () => {
      expect(resp).to.have.status(200);
    });

    it('Returns an array of objects', () => {
      expect(resp.body).to.be.an('array');
      expect(resp.body[0]).to.be.an('object');

      expect(resp.body[0]).to.have.property('_id');
      expect(resp.body[0]).to.have.property('name');
      expect(resp.body[0]).to.have.property('ingredients');
      expect(resp.body[0]).to.have.property('preparation');
      expect(resp.body[0]).to.have.property('userId');

      expect(resp.body[0].name).to.be.equal('chicken');
      expect(resp.body[0].ingredients).to.be.equal('rice, beans, chicken');
      expect(resp.body[0].preparation).to.be.equal('10 minutes on oven');
      expect(resp.body[0].userId).to.be.equal(id);
    });

  });
  describe('2 - When there are no registred recipes', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      resp = await chai.request(server)
        .get('/recipes');
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 200', () => {
      expect(resp).to.have.status(200);
    });

    it('Returns an empty array', () => {
      expect(resp.body).to.be.an('array');

      expect(resp.body.length).to.be.equal(0);
    });
  });
});

describe('GET /recipes/:id', () => {
  describe('When the recipe is returned successfully', () => {

    let resp;
    let id;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { body: { user: { _id: userId } } } = await chai.request(server)
        .post('/users')
        .send({ name: 'test', email: 'test@email.com', password: 'test@123' });
      
      id = userId;

      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send({ email: 'test@email.com', password: 'test@123' });

      const { body: { recipe: { _id: recipeId } } } = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'chicken',
          ingredients: 'rice, beans, chicken',
          preparation: '10 minutes on oven',
        });
      
      resp = await chai.request(server)
        .get(`/recipes/${recipeId}`);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 200', () => {
      expect(resp).to.have.status(200);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Return an object with specific properties', () => {
      expect(resp.body).to.have.property('_id');
      expect(resp.body).to.have.property('name');
      expect(resp.body).to.have.property('ingredients');
      expect(resp.body).to.have.property('preparation');
      expect(resp.body).to.have.property('userId');
    });

    it('Returns an object with specific values', () => {
      expect(resp.body.name).to.be.equal('chicken');
      expect(resp.body.ingredients).to.be.equal('rice, beans, chicken');
      expect(resp.body.preparation).to.be.equal('10 minutes on oven');
      expect(resp.body.userId).to.be.equal(id);
    });

  });
  describe('When the recipe is not found', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      resp = await chai.request(server)
        .get('/recipes/60fca24642ca2f602e0a4ffa');
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 404', () => {
      expect(resp).to.have.status(404);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns an object with message property', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns an object with "recipe not found" value', () => {
      expect(resp.body.message).to.be.equal('recipe not found');
    });

  });
  describe('When the entered id is invalid', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      resp = await chai.request(server)
        .get('/recipes/test');
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 404', () => {
      expect(resp).to.have.status(404);
    });

    it('Returns an object', () => {
      expect(resp.body).to.be.an('object');
    });

    it('Returns an object with message property', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns an object with "recipe not found" value', () => {
      expect(resp.body.message).to.be.equal('recipe not found');
    });

  });
});

describe('PUT /recipes/:id', () => {
  describe('1 - When the recipe is successfully edited', () => {

    let resp;
    let id;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { body: { user: { _id: userId } } } = await chai.request(server)
        .post('/users')
        .send({ name: 'test', email: 'test@email.com', password: 'test@123' });
      
      id = userId;

      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send({ email: 'test@email.com', password: 'test@123' });

      const { body: { recipe: { _id: recipeId } } } = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'chicken',
          ingredients: 'chicken',
          preparation: '10 minutes on oven',
        });
      
      resp = await chai.request(server)
        .put(`/recipes/${recipeId}`)
        .set('authorization', token)
        .send({
          name: 'breaded chicken',
          ingredients: 'chicken',
          preparation: '10 minutes on oven',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 200', () => {
      expect(resp).to.have.status(200);
    });

    it('Returns a object', () => {
      expect(resp.body).to.be.an('object');
    });
    
    it('Returns a object with specifc properties', () => {
      expect(resp.body).to.have.property('_id');
      expect(resp.body).to.have.property('name');
      expect(resp.body).to.have.property('ingredients');
      expect(resp.body).to.have.property('preparation');
      expect(resp.body).to.have.property('userId');
    });

    it('Returns a object with specific values', () => {
      expect(resp.body.name).to.be.equal('breaded chicken');
      expect(resp.body.ingredients).to.be.equal('chicken');
      expect(resp.body.preparation).to.be.equal('10 minutes on oven');
      expect(resp.body.userId).to.be.equal(id);
    });

  });
  describe('2 - When a token is not entered', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({ name: 'test', email: 'test@email.com', password: 'test@123' });

      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send({ email: 'test@email.com', password: 'test@123' });

      const { body: { recipe: { _id: recipeId } } } = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'chicken',
          ingredients: 'chicken',
          preparation: '10 minutes on oven',
        });
      
      resp = await chai.request(server)
        .put(`/recipes/${recipeId}`)
        .send({
          name: 'breaded chicken',
          ingredients: 'chicken',
          preparation: '10 minutes on oven',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 401', () => {
      expect(resp).to.have.status(401);
    });

    it('Returns a object', () => {
      expect(resp.body).to.be.an('object');
    });
    
    it('Returns a object with message property', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns a object with specific values', () => {
      expect(resp.body.message).to.have.equal('missing auth token');
    });

  });
  describe('3 - When a valid token is not entered', () => {

    let resp;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server)
        .post('/users')
        .send({ name: 'test', email: 'test@email.com', password: 'test@123' });
    
      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send({ email: 'test@email.com', password: 'test@123' });

      const { body: { recipe: { _id: recipeId } } } = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'chicken',
          ingredients: 'chicken',
          preparation: '10 minutes on oven',
        });
      
      resp = await chai.request(server)
        .put(`/recipes/${recipeId}`)
        .set('authorization', 'invalidToken')
        .send({
          name: 'breaded chicken',
          ingredients: 'chicken',
          preparation: '10 minutes on oven',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Returns status 401', () => {
      expect(resp).to.have.status(401);
    });

    it('Returns a object', () => {
      expect(resp.body).to.be.an('object');
    });
    
    it('Returns a object with message property', () => {
      expect(resp.body).to.have.property('message');
    });

    it('Returns a object with specific values', () => {
      expect(resp.body.message).to.have.equal('jwt malformed');
    });

  });
});
