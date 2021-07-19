const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('quando é criado com sucesso', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

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
      await DBServer.stop();
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

  describe('quando não é criado com sucesso', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

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
      await DBServer.stop();
    });


    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    // it('retorna um objeto', () => {
    //   expect(response.body).to.be.a('object');
    // });

    // it('o objeto possui a propriedade "user"', () => {
    //   expect(response.body).to.have.property('user');
    // });

    // it('a propriedade "user" é um objeto',
    //   () => {
    //     expect(response.body.user)
    //       .to.be.a('object');
    //   }
    // );
  });
});
