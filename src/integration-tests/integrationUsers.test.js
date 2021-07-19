const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../api/app');
const { getConnection } = require('./connectionTests');


const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('quando é criado com sucesso', () => {
    let response;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'jane',
          email: 'jane@test.com',
          password: 'senha123'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });


    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('a propriedade "user" é um objeto',
      () => {
        expect(response.body.user)
          .to.be.a('object');
      }
    );
  });

  describe('quando não é colocado um campo, como o "name"', () => {
    let response;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          email: 'jane@test.com',
          password: 'senha123'
        });
    });

    after(async () => {
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

    it('A propriedade "message" possui uma mensagem "Invalid entries. Try again."',
      () => {
        expect(response.body.message)
          .to.be.equal('Invalid entries. Try again.');
      }
    );
  });

  describe('quando o campo "email" não está correto, mas os outro estão', () => {
    let response;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'jane',
          email: 'jane@test',
          password: 'senha123'
        });
    });

    after(async () => {
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

    it('A propriedade "message" possui uma mensagem "Invalid entries. Try again."',
      () => {
        expect(response.body.message)
          .to.be.equal('Invalid entries. Try again.');
      }
    );
  });

  describe('quando o usuário já está cadastrado no banco de dados', () => {
    let connectionMock
    let response;

    before(async () => {
      connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({ name: 'jane', email: 'jane@test.com', password: 'senha123' });

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'jane',
          email: 'jane@test.com',
          password: 'senha123'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ email: 'jane@test.com' });
    });


    it('retorna o código de status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "message" possui uma mensagem "Email already registered"',
      () => {
        expect(response.body.message)
          .to.be.equal('Email already registered');
      }
    );
  });
});
