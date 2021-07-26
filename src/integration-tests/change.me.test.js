const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('quando eh criado com sucesso', () => {
        let response = {};
        let connectionMock;
        before(async () => {
          connectionMock = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(connectionMock);
          response = await chai.request(server).post('/users')
            .send(
              {
                "name": "Pablo Master Cook",
                "email": "pablo@gmail.com",
                "password": "biscoitooubolacha"
              })
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

        it('o objeto possui a propriedade "id"', () => {
            expect(response.body.user).to.have.property('id');
        });
  });

  describe('quando nao eh criado com sucesso', () => {
    let response = {};
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      response = await chai.request(server).post('/users').send({"email": "pablo@gmail.com","password": "biscoitooubolacha"});
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

      it('o "message" possui o valor "Invalid entries. Try again."', () => {
        expect(response.body.message).to.equal('Invalid entries. Try again.');
      });
  });
});
