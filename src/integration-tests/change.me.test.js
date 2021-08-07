const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const getConnection = require('./connectionMock');
const { MongoClient } = require('mongodb');
const { expect } = chai;

const DB_NAME = 'Cookmaster';
const server = require('../api/app');
const Model = require('../models');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_CONFLICT_STATUS = 409;

const ENTRIES_ERROR = 'Invalid entries. Try again.';
const EMAIL_CONFLICT_ERROR = 'Email already registered';

const ID_EXAMPLE = '604cb554311d68f491ba5781';

chai.use(chaiHttp);

describe('POST /users', () => {
  describe('quando não é passado o campo "name"', () => {
    const payload = { password: 'tester123', email: 'testythetester@gmail.com' };
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send(payload);
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(HTTP_BAD_REQUEST_STATUS);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
    });

    it('com a mensagem correta', () => {
        expect(response.body.message).to.be.equal(ENTRIES_ERROR);
    });
  });
  
  describe('quando não é passado o campo "password"', () => {
    const payload = { name: 'Testy', email: 'testythetester@gmail.com' };
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send(payload);
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(HTTP_BAD_REQUEST_STATUS);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
    });

    it('com a mensagem correta', () => {
        expect(response.body.message).to.be.equal(ENTRIES_ERROR);
    });
  });

  describe('quando não é passado o campo "email"', () => {
    const payload = { name: 'Testy', password: 'tester123' };
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send(payload);
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(HTTP_BAD_REQUEST_STATUS);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
    });

    it('com a mensagem correta', () => {
        expect(response.body.message).to.be.equal(ENTRIES_ERROR);
    });
  });

  describe('quando o "email" passado não é valido', () => {
    const payload = { name: 'Testy', password: 'tester123', email: 'testysmail' };
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send(payload);
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(HTTP_BAD_REQUEST_STATUS);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
    });

    it('com a mensagem correta', () => {
        expect(response.body.message).to.be.equal(ENTRIES_ERROR);
    });
  });

  describe('quando o "email" passado já existe no cadastro', () => {
    const payload = { name: 'Testy', password: 'tester123', email: 'testythetester@gmail.com' };
    let response;

    before(async () => {
      sinon.stub(Model.user, 'findByEmail').resolves(true);

      response = await chai.request(server).post('/users').send(payload);
    });

    after(() => {
      Model.user.findByEmail.restore();
    });

    it('retorna status 409', () => {
      expect(response).to.have.status(HTTP_CONFLICT_STATUS);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
    });

    it('com a mensagem correta', () => {
        expect(response.body.message).to.be.equal(EMAIL_CONFLICT_ERROR);
    });
  });

  describe('com dados válidos', () => {
    const payload = { name: 'Testy', password: 'tester123', email: 'testythetester@gmail.com' };
    let response;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/users').send(payload);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna status 201', () => {
      expect(response).to.have.status(HTTP_CREATED_STATUS);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "user"', () => {
        expect(response.body).to.have.property('user');
    });

    it('com a proprieadade "role"', () => {
        expect(response.body.user).to.have.property('role');
    });

    it('com o role correto', () => {
      expect(response.body.user.role).to.be.equal('user');
    });
  });
});
