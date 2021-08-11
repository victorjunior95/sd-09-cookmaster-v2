const chai = require('chai');
const sinon = require('sinon');
const app = require('../api/app');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users/admin', () => {
  describe('Quando não é possível cadastrar um administrador:', () => {
    let response;
    let token;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({
          name: "User",
          email:"user@email.com",
          password: "1234",
          role: "user",
        });

      token = await chai.request(app).post('/login')
        .send({ email: 'user@email.com', password: '1234' })
        .then((res) => res.body.token);

      response = await chai.request(app).post('/users/admin')
        .set('authorization', token).send({
          name: 'admin2',
          email: 'admin2@email.com',
          password: 'admin2'
        });
    });

    after(async () => { MongoClient.connect.restore() });

    it('Retorna um status HTTP 403.', () => {
        expect(response).to.have.status(403);
    });

    it('Retorna um objeto no body.', () => {
        expect(response.body).to.be.a('object');
    });

    it('O objeto de resposta possui uma propriedade chamada "message".', () => {
        expect(response.body).to.have.a.property('message');
    });

    it('A propriedade "message" possui uma mensagem de erro adequada.', () => {
      expect(response.body.message).to.be.equal('Only admins can register new admins');
    });
  });

  describe('Quando o cadastro é realizado com sucesso:', () => {
    let response;
    let token;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({
          name: "root",
          email:"root@email.com",
          password: "admin",
          role: "admin",
        });

      token = await chai.request(app).post('/login')
        .send({ email: 'root@email.com', password: 'admin' })
        .then((res) => res.body.token);

      response = await chai.request(app).post('/users/admin')
        .set('authorization', token).send({
          name: 'admin2',
          email: 'admin2@email.com',
          password: 'admin2'
        });
    });

    after(async () => { MongoClient.connect.restore() });

    it('Retorna um status HTTP 201.', () => {
      expect(response).to.have.status(201);
    });

    it('Retorna um objeto no body.', () => {
      expect(response.body).to.be.a('object');
    });

    it('O objeto de resposta possui a propriedade "_id".', () => {
      expect(response.body.user).to.have.property('_id');
    });

    it('O objeto de resposta possui a propriedade "role".', () => {
      expect(response.body.user).to.have.property('role');
    });

    it('A propriedade "role" possui o valor "admin".', () => {
      expect(response.body.user.role).to.be.equal('admin');
    });
  });
});
