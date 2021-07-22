const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const server = require('../api/app');
const jwtSecret = require('../api/jwtSecret');

const { ObjectId, MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMock');

chai.use(chaiHttp);

const { expect } = chai;

const createNewUser = async (payload) => chai.request(server)
  .post('/users')
  .send(payload);

const login = async (payload) => chai.request(server)
  .post('/login')
  .send(payload);

describe('POST /users', () => {
  let response;
  
  const invalidEntryStatus = 400;
  const successEntryStatus = 201;
  const invalidEntryMsg = 'Invalid entries. Try again.';

  describe('sem "name" na requisição, usuário não é criado', () => {
    const userPayload = {
      email: 'testing@domain.com',
      password: 'testPassw0rd',
    };
    
    before(async () => {
      response = await createNewUser(userPayload);
    });

    it(`retorna status ${invalidEntryStatus}`, () => {
      expect(response).to.have.status(invalidEntryStatus);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('retorna um objeto com propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it(`"message" possui texto "${invalidEntryMsg}"`, () => {
      expect(response.body.message).to.be.equal(invalidEntryMsg);
    });
  });

  describe('sem "email" na requisição, usuário não é criado', () => {
    const userPayload = {
      name: "Teste da Silva",
      password: 'testPassw0rd',
    };
    
    before(async () => {
      response = await createNewUser(userPayload);
    });

    it(`retorna status ${invalidEntryStatus}`, () => {
      expect(response).to.have.status(invalidEntryStatus);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('retorna um objeto com propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it(`"message" possui texto "${invalidEntryMsg}"`, () => {
      expect(response.body.message).to.be.equal(invalidEntryMsg);
    });
  });

  describe('sem "password" na requisição, usuário não é criado', () => {
    const userPayload = {
      name: "Teste da Silva",
      email: 'testing@domain.com',
    };
    
    before(async () => {
      response = await createNewUser(userPayload);
    });

    it(`retorna status ${invalidEntryStatus}`, () => {
      expect(response).to.have.status(invalidEntryStatus);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('retorna um objeto com propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it(`"message" possui texto "${invalidEntryMsg}"`, () => {
      expect(response.body.message).to.be.equal(invalidEntryMsg);
    });
  });

  describe('usuário normal é criado', () => {
    let connectionMock;
    const userPayload = {
      name: "Teste da Silva",
      email: 'testing@domain.com',
      password: 'testPassw0rd',
    };
    
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await createNewUser(userPayload);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it(`retorna status ${successEntryStatus}`, () => {
      expect(response).to.have.status(successEntryStatus);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('retorna um objeto com propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it(`"user" possui as propriedades "name" e "email"`, () => {
      expect(response.body.user).to.have.property('name');
      expect(response.body.user).to.have.property('email');
      expect(response.body.user).not.to.have.property('password');
    });

    it(`as propriedades "name" e "email" possuem os valores enviados`, () => {
      expect(response.body.user.name).to.be.equal(userPayload.name);
      expect(response.body.user.email).to.be.equal(userPayload.email);
    });

    it(`"user" não possui a propriedade "password"`, () => {
      expect(response.body.user).not.to.have.property('password');
    });

    it(`"user" possui propriedade "_id"`, () => {
      expect(response.body.user).to.have.property('_id');
    });

    it(`"user" possui propriedade "_id" no formato do MongoDB`, () => {
      expect(ObjectId.isValid(response.body.user._id)).to.be.equal(true);
    });

    it(`"user" possui propriedade "role"`, () => {
      expect(response.body.user).to.have.property('role');
    });

    it(`propriedade "role" tem valor "user"`, () => {
      expect(response.body.user.role).to.be.equal('user');
    });
  });

});

describe('POST /login', () => {
  let response;
  
  const invalidLoginStatus = 401;
  const missingFiedlsMsg = 'All fields must be filled';
  const invalidLoginMsg = 'Incorrect username or password';
  const successLoginStatus = 200;

  describe('sem "password" na requisição, login não é realizado', () => {
    const userPayload = {
      email: 'testing@domain.com',
      // password: 'testPassw0rd',
    };
    
    before(async () => {
      response = await login(userPayload);
    });

    it(`retorna status ${invalidLoginStatus}`, () => {
      expect(response).to.have.status(invalidLoginStatus);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('retorna um objeto com propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it(`"message" possui texto "${missingFiedlsMsg}"`, () => {
      expect(response.body.message).to.be.equal(missingFiedlsMsg);
    });
  });

  describe('sem "email" na requisição, login não é realizado', () => {
    const userPayload = {
      // email: 'testing@domain.com',
      password: 'testPassw0rd',
    };
    
    before(async () => {
      response = await login(userPayload);
    });

    it(`retorna status ${invalidLoginStatus}`, () => {
      expect(response).to.have.status(invalidLoginStatus);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('retorna um objeto com propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it(`"message" possui texto "${missingFiedlsMsg}"`, () => {
      expect(response.body.message).to.be.equal(missingFiedlsMsg);
    });
  });

  describe('com email inválido, login não é realizado', () => {
    let connectionMock;
    const userPayload = {
      email: 'testing@domain.com',
      password: 'testPassw0rd',
    };
    
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await createNewUser({ ...userPayload, name: 'Nome de Teste' });
      response = await login({ ...userPayload, email: 'test@' });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it(`retorna status ${invalidLoginStatus}`, () => {
      expect(response).to.have.status(invalidLoginStatus);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('retorna um objeto com propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it(`"message" possui texto "${invalidLoginMsg}"`, () => {
      expect(response.body.message).to.be.equal(invalidLoginMsg);
    });
  });

  describe('com email não cadastrado, login não é realizado', () => {
    let connectionMock;
    const userPayload = {
      email: 'testing@domain.com',
      password: 'testPassw0rd',
    };
    
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await createNewUser({ ...userPayload, name: 'Nome de Teste' });
      response = await login({ ...userPayload, email: 'test@domain.com' });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it(`retorna status ${invalidLoginStatus}`, () => {
      expect(response).to.have.status(invalidLoginStatus);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('retorna um objeto com propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it(`"message" possui texto "${invalidLoginMsg}"`, () => {
      expect(response.body.message).to.be.equal(invalidLoginMsg);
    });
  });

  describe('com senha inválida, login não é realizado', () => {
    let connectionMock;
    const userPayload = {
      email: 'testing@domain.com',
      password: 'testPassw0rd',
    };
    
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await createNewUser({ ...userPayload, name: 'Nome de Teste' });
      response = await login({ ...userPayload, password: 'wrong password' });
    });

    after(async () => {
      MongoClient.connect.restore();
    });
    
    it(`retorna status ${invalidLoginStatus}`, () => {
      expect(response).to.have.status(invalidLoginStatus);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('retorna um objeto com propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it(`"message" possui texto "${invalidLoginMsg}"`, () => {
      expect(response.body.message).to.be.equal(invalidLoginMsg);
    });
  });

  describe('quando login é realizado, um token válido é retornado', () => {
    let connectionMock;
    let decryptedToken;
    const userPayload = {
      email: 'testing@domain.com',
      password: 'testPassw0rd',
    };
    
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await createNewUser({ ...userPayload, name: 'Nome de Teste' });
      response = await login(userPayload);
      decryptedToken = jwt.verify(response.body.token, jwtSecret);
    });

    after(async () => {
      MongoClient.connect.restore();
    });
    
    it(`retorna status ${successLoginStatus}`, () => {
      expect(response).to.have.status(successLoginStatus);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('retorna um objeto com propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });

    it('"token" é uma string', () => {
      expect(response.body.token).to.be.a('string');
    });

    it('"token" decriptografado tem as propriedades "_id", "email" e "role"', () => {
      expect(decryptedToken).to.have.property('email');
      expect(decryptedToken).to.have.property('_id');
      expect(decryptedToken).to.have.property('role');
    });

    it('"_id", "email" e "role" do token tem os valores corretos', () => {
      expect(decryptedToken.email).to.be.equal(userPayload.email);
      expect(decryptedToken.role).to.be.equal('user');
      expect(ObjectId.isValid(decryptedToken._id)).to.be.equal(true);
    });
  });
});
