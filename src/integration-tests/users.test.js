const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

const sinon = require('sinon');
const app = require('../api/app');
const { MongoClient } = require('mongodb');
const connection = require('./connection');

describe('Registering users', () => {
  describe('when it is created successfully', () => {
    let response;
    let conn;

    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);

      response = await chai.request(app)
        .post('/users')
        .send({
          name: "fake_name",
          email: "email@fake.com",
          password: "fakepassword"
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Return status code 201',async () => {
      expect(response).to.have.status(201);
    });

    it('Return a object', () => {
      expect(response.body).to.be.a('object');
    });
    it('Object has the property "user"', () => {
      expect(response.body).to.have.property('user');
    })
    it('User has the properties "name", "email", "role" and "_id"', () => {
      const { user } = response.body;

      expect(user).to.have.property('name');
      expect(user.name).to.be.equal('fake_name');

      expect(user).to.have.property('email');
      expect(user.email).to.be.equal('email@fake.com');

      expect(user).to.have.property('role');
      expect(user.role).to.be.equal('user');

      expect(user).to.have.property('_id');
    });
  });
  describe('when it is not created successfully', () => {
    let response;

    before(async () => {
      response = await chai.request(app)
        .post('/users')
        .send({});
    });

    it('Return status code 400',async () => {
      expect(response).to.have.status(400);
    });

    it('Return the message "Invalid entries. Try again."', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('when the email already exists', () => {
    let response;
    let conn;
    const user = { name: 'fakeName', email: 'fake@email.com', password: '123'};

    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
      await conn.db('Cookmaster').collection('users').insertOne(user);

      response = await chai.request(app)
        .post('/users')
        .send(user);
    });

    after(async () => {
      MongoClient.connect.restore();
      await conn.db('Cookmaster').collection('users').deleteOne({ name: 'fakeName' });
    });

    it('Return status code 409', () => {
      expect(response).to.have.status(409);
    });
    it('Return the message "Email already registered"', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });
}); 