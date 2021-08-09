const chai = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const app = require('../api/app');
const { getConnection } = require('./connectionMock');

const { expect } = require('chai');

describe('POST /login', () => {
  it('Será validado que o campo "email" é obrigatório', async () => {
    let response;

    response = await chai.request(app).post('/login').send({
      password: '12345678',
    });

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('All fields must be filled');
  });

  it('Será validado que o campo "password" é obrigatório', async () => {
    let response;

    response = await chai.request(app).post('/login').send({
      email: 'erickjacquin@gmail.com',
    });

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('All fields must be filled');
  });

  it('Será validado que não é possível fazer login com um "email" inválido', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    response = await chai.request(app).post('/login').send({
      email: 'erickjacquin@',
      password: '12345678',
    });

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('Incorrect username or password');

    MongoClient.connect.restore();
  });

  it('Será validado que não é possível fazer login com um "email" diferente', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    response = await chai.request(app).post('/login').send({
      email: 'erickjacquin2@gmail.com',
      password: '12345678',
    });

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('Incorrect username or password');

    MongoClient.connect.restore();
  });

  it('Será validado que não é possível fazer login com um "password" inválido', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    response = await chai.request(app).post('/login').send({
      email: 'erickjacquin@gmail.com',
      password: '12',
    });

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('Incorrect username or password');

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin2@gmail.com' });
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('users').insertOne({
      email: 'erickjacquin@gmail.com',
      password: '12345678',
    });

    response = await chai.request(app).post('/login').send({
      email: 'erickjacquin@gmail.com',
      password: '12345678',
    });

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('token');
    expect(response.body.token).to.not.be.empty;

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });
  });
});
