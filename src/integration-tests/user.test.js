const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { expect, request } = require("chai");

const server = require('../api/app');

const getConnection = require('./mongoMock');

chai.use(chaiHttp);

const { MongoClient } = require('mongodb');
const app = require('../api/app');

describe('Criação de usuario', async () => {
  describe('Nome invalido', async () => {
    let fakeDB;
    let response;

    before(async (done) => {
      const user = {name: 'oi', email: 'root@email.com', password: 'admin'}
      response = await chai.request(server).post('/users').send(user).end(() => done())
    });

    it('Retorna status 400', async () => {
      expect(response.statusCode).to.be.equal(400)
    });

    it('Retorna mensagem especifica', async function(){
      expect(response.body.message).to.be.equal('All fields must be filled')
    });
  })
});
