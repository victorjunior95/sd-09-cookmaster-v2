const chai = require('chai');
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
const { response } = require('express');
const { MongoClient } = require('mongodb');

const app = require('../api/app');
const { getConnection } = require('./connectionMock');

const { expect } = chai;

describe('Cadastro de usuarios, POST /users', () => {
  describe('Quando name, email e password não são informados', () => {
    before(async () => {
      response = await chai.request(app).post('/users').send({});
    });

    it('retorna status HTTP 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorne um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade chamada `message`', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('A propriedade `message` possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal(
        'Invalid entries. Try again.'
      );
    });
  });

  describe('Quando o cadastro nao e realizado com sucesso', () => {

  });
  describe('Quando o cadastro e realizado com sucesso', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock
        .db('Cookmaster').collection('users').insertOne({
          "name": "fake-name",
          "email": "fake-email",
          "password": "fake-password"
        });

      response = await (await chai.request(app).post('/users')).setEncoding({
        "name": "fake-name",
        "email": "fake-email",
        "password": "fake-password"
      });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('', () => {

    });
  });
});
