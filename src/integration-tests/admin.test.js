const chai = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const app = require('../api/app');
const { getConnection } = require('./connectionMock');

const { expect } = require('chai');

describe('POST /users/admin', () => {
  it('Será validado que não é possível cadastrar um usuário admin, sem estar autenticado como um usuário admin', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('users').insertOne({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
      role: 'user',
    });

    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'erickjacquin@gmail.com', password: '12345678' })
      .then((response) => response.body.token);

    response = await chai
      .request(app)
      .post('/users/admin')
      .set('authorization', token)
      .send({
        name: 'usuario admin',
        email: 'usuarioadmin@email.com',
        password: 'admin',
      });

    expect(response).to.have.status(403);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal(
      'Only admins can register new admins'
    );

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });
  });

  // { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }
  it('Será validado que é possível cadastrar um usuário admin', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('users').insertOne({
      name: 'admin',
      email: 'root@email.com',
      password: 'admin',
      role: 'admin',
    });

    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'root@email.com', password: 'admin' })
      .then((response) => response.body.token);

    response = await chai
      .request(app)
      .post('/users/admin')
      .set('authorization', token)
      .send({
        name: 'usuario admin',
        email: 'usuarioadmin@email.com',
        password: 'admin',
      });

    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('user');
    expect(response.body.user).to.not.be.empty;

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'root@email.com' });
  });

  /* it('', async () => {}) */
});
