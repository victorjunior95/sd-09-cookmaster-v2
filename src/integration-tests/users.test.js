const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../api/app');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing route POST /users', () => {
  describe('In case of success', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({ name: 'jack', email: 'jack@email.com', password: 'jack' });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  
    it('should send a 201 status code', () => {
      expect(response).to.have.status(201);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "user" property', () => {
      expect(response.body).to.have.property('user');
    });
    it('should be an object as "user" property', () => {
      expect(response.body.user).to.be.a('object');
    });
    it('should have the right properties containing the new user information', () => {
      expect(response.body.user).to.have.keys('_id', 'name', 'email', 'role');
    });
  });

  describe('In case the "name" property be missing', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({ email: 'jack@email.com', password: 'jack' });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  
    it('should send a 400 status code', () => {
      expect(response).to.have.status(400);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should contain an error message', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('In case the "email" property be missing', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      response = await chai.request(server)
        .post('/users')
        .send({ name: 'jack', password: 'jack' });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  
    it('should send a 400 status code', () => {
      expect(response).to.have.status(400);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should contain an error message', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('In case the "email" property is invalid', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      response = await chai.request(server)
        .post('/users')
        .send({ name: 'jack', email: 'jackemail.com', password: 'jack' });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  
    it('should send a 400 status code', () => {
      expect(response).to.have.status(400);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should contain an error message', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('In case the "password" property is missing', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      response = await chai.request(server)
        .post('/users')
        .send({ name: 'jack', email: 'jack@email.com' });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  
    it('should send a 400 status code', () => {
      expect(response).to.have.status(400);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should contain an error message', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

//   describe('In case the user already exists', () => {
//     let response;
//     const DBServer = new MongoMemoryServer();

//     before(async () => {
//       const URLMock = await DBServer.getUri();
//       const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
//       sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
//       await connectionMock.db('Cookmaster').collection('users')
//         .insertOne({ name: 'jack', email: 'jack@email.com', password: 'jack'});
//       response = await chai.request(server).post('/users').send({ name: 'jack', email: 'jack@email.com' });
//     });

//     after(async () => {
//       const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
//       sinon.stub(MongoClient, 'connect').resolves(connectionMock);
//       MongoClient.connect.restore();
//       await connectionMock.db('Cookmaster').collection('users').deleteOne({ email: 'jack@email.com' });
//       await DBServer.stop();
//     });
  
//     it('should send a 409 status code', () => {
//       expect(response).to.have.status(409);
//     });
//     it('should be an object', () => {
//       expect(response.body).to.be.a('object');
//     });
//     it('should have a "message" property', () => {
//       expect(response.body).to.have.property('message');
//     });
//     it('should contain an error message', () => {
//       expect(response.body.message).to.be.equal('Email already registered');
//     });
//   });
});

describe('Testing route POST /login', () => {
  describe('In case of success', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({ name: 'mia', email: 'mia@email.com', password: 'mia' });
      response = await chai.request(server).post('/login').send({ email: 'mia@email.com', password: 'mia' });
    });

    after(async () => {
      MongoClient.connect.restore();
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ email: 'mia@email.com' });
      await DBServer.stop();
    });
  
    it('should send a 200 status code', () => {
      expect(response).to.have.status(200);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "token" property', () => {
      expect(response.body).to.have.property('token');
    });
    it('should be a string', () => {
      expect(response.body.user).to.be.a('string');
    });
  });

  describe('In case the "name" property is invalid', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      response = await chai.request(server).post('/login').send({ email: 'mia@email.com', password: 'mia' });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  
    it('should send a 401 status code', () => {
      expect(response).to.have.status(401);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should be an error message', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });

  describe('In case the "email" property is missing', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      response = await chai.request(server).post('/login').send({ password: 'mia' });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  
    it('should send a 401 status code', () => {
      expect(response).to.have.status(401);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should be an error message', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('In case the "password" property is missing', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      response = await chai.request(server) .post('/login').send({ email: 'mia@email.com' });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  
    it('should send a 401 status code', () => {
      expect(response).to.have.status(401);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should be an error message', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('In case the "password" property is invalid', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      response = await chai.request(server).post('/login').send({ email: 'mia@email.com', password: 'jack'});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  
    it('should send a 401 status code', () => {
      expect(response).to.have.status(401);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should be an error message', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });
});

describe('Testing route POST /admin', () => {
  describe('In case of success', () => {
    let response;
    let token;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({ name: 'mia', email: 'mia@email.com', password: 'mia', role: 'admin' });

      login = await chai.request(server).post('/login')
        .send({ email: 'mia@email.com', password: 'mia' });

      token = login.body.token;

      response = await chai.request(server).post('/users/admin')
        .send({ name: 'admin', email: 'admin@admin.com', password: 'admin' })
        .set({ authorization: token });
    });

    after(async () => {
      MongoClient.connect.restore();
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await DBServer.stop();
    });

    it('should send a 201 status code', () => {
      expect(response).to.have.status(201);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('user');
    });
    it('should have the right properties containing the new admin information', () => {
      expect(response.body.user).to.have.all.keys('name', 'email', 'role', '_id');
    });
  });

  describe('In case the "email" property is missing', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      response = await chai.request(server).post('/users/admin').send({ password: 'mia' });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  
    it('should send a 401 status code', () => {
      expect(response).to.have.status(401);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should be an error message', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('In case the "email" property is invalid', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      
      response = await chai.request(server).post('/users/admin').send({ name: 'mia', email: 'miaemail.com', password: 'mia'});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  
    it('should send a 400 status code', () => {
      expect(response).to.have.status(400);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should be an error message', () => {
      expect(response.body.message).to.be.a('string');
    });
  });

  describe('In case the user is not an admin', () => {
    let response;
    let token;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({ name: 'mia', email: 'mia@email.com', password: 'mia' });

      login = await chai.request(server).post('/login')
        .send({ email: 'mia', password: 'mia' });

      token = login.body.token;
      
      response = await chai.request(server).post('/users/admin')
        .send({ name: 'admin', email: 'admin@admin.com', password: 'admin'})
        .set({ authorization: token });
    });

    after(async () => {
      MongoClient.connect.restore();
      const connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });
      await connectionMock.db('Cookmaster').collection('users').deleteOne({ email: 'mia@email.com' });
      await DBServer.stop();
    });
  
    it('should send a 403 status code', () => {
      expect(response).to.have.status(403);
    });
    it('should be an object', () => {
      expect(response.body).to.be.a('object');
    });
    it('should have a "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    it('should be an error message', () => {
      expect(response.body.message).to.be.equal('Only admins can register new admins');
    });
  });
});
