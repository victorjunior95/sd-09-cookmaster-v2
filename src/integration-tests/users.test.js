const chai = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const app = require('../api/app');
const { getConnection } = require('./connectionMock');

const { expect } = require('chai');

describe('POST /users', () => {
  it('Será validado que o campo "name" é obrigatório', async () => {
    let response;

    response = await chai.request(app).post('/users').send({
      email: 'erickjacquin@gmail.com',
      password: '12345678',
    });

    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('Invalid entries. Try again.');
  });

  it('Será validado que o campo "email" é obrigatório', async () => {
    let response;

    response = await chai.request(app).post('/users').send({
      name: 'Erick Jacquin',
      password: '12345678',
    });

    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('Invalid entries. Try again.');
  });

  it('Será validado que não é possível cadastrar usuário com o campo "email" inválido', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    response = await chai.request(app).post('/users').send({
      name: 'Erick Jacquin',
      email: 'erickjacquin@',
      password: '12345678',
    });

    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('Invalid entries. Try again.');

    MongoClient.connect.restore();
  });

  it('Será validado que o campo "password" é obrigatório', async () => {
    let response;

    response = await chai.request(app).post('/users').send({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
    });

    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('Invalid entries. Try again.');
  });

  it('Será validado que o campo "email" é único', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('users').insertOne({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
    });

    response = await chai.request(app).post('/users').send({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
    });

    expect(response).to.have.status(409);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('Email already registered');

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });
  });

  it('Será validado que é possível cadastrar usuário com sucesso', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    response = await chai.request(app).post('/users').send({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
    });

    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('user');
    expect(response.body.user).to.not.be.empty;

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });
  });
});
