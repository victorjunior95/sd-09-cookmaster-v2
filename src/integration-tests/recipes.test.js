const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const connection = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);


let connectionMock;

describe('Testa o caminho "/users"', () => {
  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('1 - Testa a adição de um usuário', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.deleteMany({});
      response = await chai.request(server).post('/users').send({
        name: 'Eu Mesmo',
        email: 'olaturubom@email.com',
        password: 'xubiriu',
      }
      );
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('etorna um body com a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('a propriedade "user" deve ter a propriedade "name"', () => {
      expect(response.body.user).to.have.property('name');
    });

    it('a propriedade "user" deve ter a propriedade "email"', () => {
      expect(response.body.user).to.have.property('email');
    });

    it('a propriedade "user" deve ter a propriedade "role"', () => {
      expect(response.body.user).to.have.property('role');
    });

    it('a propriedade "user" deve ter a propriedade "role" com valor "user"', () => {
      expect(response.body.user.role).to.be.equal('user');
    });

    it('deve existir a propriedade "_id" dentro de user', () => {
      expect(response.body.user).to.have.property('_id');
    });

    it('retorna com código de estatus "201"', () => {
        expect(response).to.have.status(201);
      });
  });
});
