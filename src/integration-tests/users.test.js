const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

const DBServer = new MongoMemoryServer();

const getconnectionMock = async () => {
  const URLMock = await DBServer.getUri();
  return MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
}

describe('POST /users', () => {
  describe('quando nao tem email', () => {
    let response;

    before(async () => {

    response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Teste',
        password: 'senha123'
      });
    });

    it('retorna o codigo de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando nao tem name', () => {
    let response;

    before(async () => {

    response = await chai.request(server)
      .post('/users')
      .send({
        email: 'teste@teste.com',
        password: 'senha123'
      });
    });

    it('retorna o codigo de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando nao tem password', () => {
    let response;

    before(async () => {

    response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Teste',
        email: 'teste@teste.com'
      });
    });

    it('retorna o codigo de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando ja tem um usuario no banco', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    
      await connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne({
            name: 'Teste',
            email: 'teste@teste.com',
            password: 'senha123',
          })

      const test02 = await connectionMock.db('Cookmaster').collection('users').findOne({ email: 'teste@teste.com' });

      console.log(test02);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'Teste',
          email: 'teste@teste.com',
          password: 'senha123'
        });

      const test = await connectionMock.db('Cookmaster').collection('users').find({}).toArray();
        console.log(response.body);
      console.log(test);
    });

    after(async () => {
      await connectionMock.db('Cookmaster')
      .collection('users')
      .deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o codigo de status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "Email already registered"', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });

  describe('quando consegue criar um user', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const test = await connectionMock.db('Cookmaster').collection('users').find({}).toArray();

      console.log(test);

    response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'senha123'
      });
      
      const test02 = await connectionMock.db('Cookmaster').collection('users').find({}).toArray();
      
      console.log(test02);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster')
      .collection('users')
      .deleteMany({});
    });

    it('retorna o codigo de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('users');
    });
  });

});