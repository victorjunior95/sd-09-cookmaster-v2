const chai = require('chai');
const sinon = require('sinon');
const chaihttp = require('chai-http');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaihttp);
const { expect } = chai;

const usersToBeRegistered = [
  { name: 'Albert Einstein', password: '123456', email: 'aeinstein@email.com' },
  { name: 'Nikola Tesla', password: 'nicola123', email: 'elnick@email.com' },
  { name: 'Thomas Edison', password: 'tominhas55', email: 'totoedison@email.com' },
  { name: 'Elon Musk', password: 'elmusktheboss', email: 'elonMusk@tesla.com' },
]

describe('/GET - GET ALL USERS - return a list off all users on data base;', () => {

  describe('Should return an array list of all users', () => {
    let connectionMock;
    let response;
    before(async () => {
      const DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
      connectionMock = await MongoClient.connect(URLMock, OPTIONS);
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertMany(usersToBeRegistered);
      response = await chai.request(server).get('/users/');
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
    });

    it('Should return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Should return an array with four elements', () => {
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(4);
    });

    it('Should have the array with users, who was previously registered', () => {
      expect(response.body[0].name).to.be.equal('Albert Einstein');
      expect(response.body[1].name).to.be.equal('Nikola Tesla');
      expect(response.body[2].name).to.be.equal('Thomas Edison');
      expect(response.body[3].name).to.be.equal('Elon Musk');
    });
  });
});