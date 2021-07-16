const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient, ObjectId } = require('mongodb');
const { expect } = chai;
chai.use(chaiHttp);

const server = require('../api/app');
const getConnection = require('./connectionMock');

const validRegisteredAdmin = {
  _id: "60f0eefd90813958281cadfd",
  name: "admin",
  email: "root@email.com",
  password: "admin",
  role: "admin"
};

const validRegisteredUser = {
  _id: "60f18a519c696e3c700d93c9",
  name: 'Thor Odinson',
  email: 'thorodinson@email.com',
  password: 'asgard123',
  role: 'user'
};

const validUser = {
  name: 'Thor Odinson',
  email: 'thorodinson@email.com',
  password: 'asgard123'
};

const validAdmin = {
  name: 'Odin Borson',
  email: 'odinborson@email.com',
  password: 'valhalla123'
};

const invalidUserWithoutName = {
  email: 'thorodinson@email.com',
  password: 'asgard123'
};

const invalidUserWithoutEmail = {
  name: 'Thor Odinson',
  password: 'asgard123'
};

const invalidUserWithoutPassword = {
  name: 'Thor Odinson',
  email: 'thorodinson@email.com'
};

const userCredentials = { email: 'thorodinson@email.com', password: 'asgard123' };

const userCredentialsWithInvalidEmail = { email: 'thorkingofasgard@email.com', password: 'asgard123' };

const userCredentialsWithInvalidPassword = { email: 'thorodinson@email.com', password: 'kingofasgard' };

const userCredentialsWithoutEmail = { password: 'asgard123' };

const userCredentialsWithoutPassword = { email: 'thorodinson@email.com' };

const adminCredentials = { email: 'root@email.com', password: 'admin' };

describe('POST /users', () => {

  describe('Adiciona um usuario invalido sem o field name', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/users').send(invalidUserWithoutName);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });

  });

  describe('Adiciona um usuario invalido sem o field email', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/users').send(invalidUserWithoutEmail);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });

  });

  describe('Adiciona um usuario invalido sem o field password', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/users').send(invalidUserWithoutPassword);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });

  });

  describe('Adiciona um usuario com email repetido', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);

      response = await chai.request(server).post('/users').send(validUser);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 409', () => {
      expect(response).to.have.status(409);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "Email already registered"', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });

  });

  describe('Adiciona um usuario valido', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/users').send(validUser);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('a propriedade "user" possui a propriedade "_id"', () => {
      expect(response.body.user).to.have.property('_id');
    });

    it('a propriedade "user" possui a propriedade "name"', () => {
      expect(response.body.user).to.have.property('name');
    });

    it('a propriedade "user" possui a propriedade "email"', () => {
      expect(response.body.user).to.have.property('email');
    });

    it('a propriedade "user" possui a propriedade "role"', () => {
      expect(response.body.user).to.have.property('role');
    });

    it('a propriedade "role" possui o valor "user"', () => {
      expect(response.body.user.role).to.be.equal('user');
    });

    it('a propriedade "user" nao possui a propriedade "password"', () => {
      expect(response.body.user).not.to.have.property('password');
    });

  });

});

describe('POST /users/admin', () => {

  describe('Tenta adicionar um admin por um user', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);

      const token = await chai
        .request(server)
        .post('/login')
        .send(userCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send(validAdmin);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 403', () => {
      expect(response).to.have.status(403);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "Only admins can register new admins"', () => {
      expect(response.body.message).to.be.equal('Only admins can register new admins');
    });

  });

  describe('Tenta adicionar um admin por um admin', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredAdmin);

      const token = await chai
        .request(server)
        .post('/login')
        .send(adminCredentials)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send(validAdmin);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('a propriedade "user" possui a propriedade "_id"', () => {
      expect(response.body.user).to.have.property('_id');
    });

    it('a propriedade "user" possui a propriedade "name"', () => {
      expect(response.body.user).to.have.property('name');
    });

    it('a propriedade "user" possui a propriedade "email"', () => {
      expect(response.body.user).to.have.property('email');
    });

    it('a propriedade "user" possui a propriedade "role"', () => {
      expect(response.body.user).to.have.property('role');
    });

    it('a propriedade "role" possui o valor "admin"', () => {
      expect(response.body.user.role).to.be.equal('admin');
    });

    it('a propriedade "user" nao possui a propriedade "password"', () => {
      expect(response.body.user).not.to.have.property('password');
    });

  });

});

describe('POST /login', () => {

  describe('Tenta fazer login sem o email', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/login').send(userCredentialsWithoutEmail);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });

  });

  describe('Tenta fazer login sem o password', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai
        .request(server)
        .post('/login')
        .send(userCredentialsWithoutPassword);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });

  });

  describe('Tenta fazer login com email invalido', () => {

    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);

      response = await chai
        .request(server)
        .post('/login')
        .send(userCredentialsWithInvalidEmail);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });

  });

  describe('Tenta fazer login com senha invalida', () => {
    
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);

      response = await chai
        .request(server)
        .post('/login')
        .send(userCredentialsWithInvalidPassword);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui o texto "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });

  });

  describe('Faz o login com as credenciais corretas', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(validRegisteredUser);

      response = await chai
        .request(server)
        .post('/login')
        .send(userCredentials);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });
    
    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
    
    it('a propriedade "token" nao esteja vazio', () => {
      expect(response.body.token).not.to.be.empty;
    });
  });

});
