const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const connection = require('../api/connection');

chai.use(chaiHttp);

const app = require('../api/app');
const { getConnection, DBServer } = require('./connectionMock');
const { MongoClient } = require('mongodb');

const { expect } = chai;

describe('/user | POST', () => {
  before(async () => {
    const connectionMock = await getConnection()
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('when create user successfully', () => {
    let response;

    before(async () => {
      response = await chai
        .request(app).post('/users')
        .send({ name: 'user test test', email: 'usertest@gmail.com', password: 123456599 });
    });

    it('expect HTTP STATUS = 201', () => {
      expect(response).to.have.status(201);
    });

    it('expect response body is an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('expect body have property user', () => {
      expect(response.body).to.have.property('user')
    });

    it('expect recipe have correct properties', () => {
      expect(response.body.user).to.have.property('role');
      expect(response.body.user).to.have.property('email');
      expect(response.body.user).to.have.property('name');
    });
  });
});
