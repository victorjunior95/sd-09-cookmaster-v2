const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

const sinon = require('sinon');
const app = require('../api/app');
const { MongoClient } = require('mongodb');
const connection = require('./connection');
const { response } = require('express');


describe('Requesting login', () => {
  describe('when successfully logged in', () => {
    let response;
    let conn;
    const user = { name: 'fakeName', email: 'fake@email.com', password: '123'};
    
    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
      await conn.db('Cookmaster').collection('users').insertOne(user);

      response = await chai.request(app)
        .post('/login')
        .send({
          email: "fake@email.com",
          password: "123"
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await conn.db('Cookmaster').collection('users').deleteOne({ name: 'fakeName' });
    });
    
    it('Return the status code 200', () => {
      expect(response).to.have.status(200);
    });
  
    it('Return a token', () => {
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.not.empty;
    });
  });
  
  describe('when login is not successful', () => {
    let response;
    
    before(async () => {
      response = await chai.request(app)
        .post('/login')
        .send({});
    });

    it('when the request not have a body', () => {
      expect(response).to.have.status(401);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('when the email is in the wrong format', () => {
    let response;
    
    before(async () => {
      response = await chai.request(app)
        .post('/login')
        .send({
          email: "fakeemail.com",
          password: "123"
        });
    });

    it('Return the message "Incorrect username or password"', () => {
      expect(response).to.have.status(401);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });
});