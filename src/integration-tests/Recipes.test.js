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
      expect(resp.body.recipe.name).to.be.equals('chicken');
      expect(resp.body.recipe.ingredients).to.be.equals('rice, beans, chicken');
      expect(resp.body.recipe.preparation).to.be.equals('10 minutes on oven');
      expect(resp.body.recipe.userId).to.be.equals(id);
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
      expect(resp.body.message).to.be.equals('Invalid entries. Try again.');
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
      expect(resp.body.message).to.be.equals('Invalid entries. Try again.');
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
      expect(resp.body.message).to.be.equals('Invalid entries. Try again.');
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
      expect(resp.body.message).to.be.equals('jwt malformed');
    });

  });
});
