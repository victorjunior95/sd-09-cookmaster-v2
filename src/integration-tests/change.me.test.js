const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('../api/app');
const connectionMock = require('./connectionMock');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp)

describe('/POST /users', () => {
  describe('it is not possible to register without a name field', () => {
    let response;
    let connection;

    before(async () => {
      connection = await connectionMock()
      sinon.stub(MongoClient, 'connect').resolves(connection)

      response = await chai.request(server)
        .post('/users')
        .send({
          password: '123456',
          email: 'user@user.com'
        });
    })

    after(async () => {
      MongoClient.connect.restore();
    })

    it('expect status 400', () => {
      expect(response).to.have.status(400)
    });

    it('expect that response to be a object', () => {
      expect(response.body).to.be.a('object');
    });

    it('expect that result have a message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('expect message is "Invalid entries. Try again."', () => {
      expect(response.body.message).to.equal("Invalid entries. Try again.")
    })
  })

  describe('it\'s not possible to register withou password field', () => {
    let response;
    let connection;

    before(async () => {
      connection = await connectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connection);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'john',
          email: 'user@user.gmail',
        })
    })

    after(() => {
      MongoClient.connect.restore();
    })

    it('expect status 400', () => {
      expect(response).to.status(400);
    })

    it('expect that response have a object', () => {
      expect(response.body).to.be.a('object');
    })

    it('expect that body have a message', () => {
      expect(response.body).to.have.property('message');
    })

    it('expect mesasge "Invalid entries. Try again."', () => {
      expect(response.body.message).to.equal("Invalid entries. Try again.");
    })
  });

  describe('it\'s not possible to register withou email field', () => {
    let response;
    let connection;

    before(async () => {
      connection = await connectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connection);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'john',
          password: '123456',
        })
    })

    after(() => {
      MongoClient.connect.restore();
    })

    it('expect status 400', () => {
      expect(response).to.status(400);
    })

    it('expect that response have a object', () => {
      expect(response.body).to.be.a('object');
    })

    it('expect that body have a message', () => {
      expect(response.body).to.have.property('message');
    })

    it('expect mesasge "Invalid entries. Try again."', () => {
      expect(response.body.message).to.equal("Invalid entries. Try again.");
    })
  })
});
