const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('../api/app');

const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

let mongoServer;

const dbConnect = async ()  => {
  mongoServer = await MongoMemoryServer.create();
  const uriMock = await mongoServer.getUri();
  const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };
  const connectionMock = await MongoClient.connect(uriMock, dbConfig);

  sinon.stub(MongoClient, 'connect')
    .resolves(connectionMock);
};

const dbDisconnect = async () => {
  MongoClient.connect.restore();
  await mongoServer.stop();
};

describe('POST /users', () => {
  let response;
  
  const createNewUser = async (payload) => {
    response = await chai.request(server)
      .post('/users')
      .send(payload);
  };
  
  const invalidEntryStatus = 400;
  const successEntryStatus = 201;
  const invalidEntryMsg = 'Invalid entries. Try again.';

  describe('sem "name" na requisição, usuário não é criado', () => {
    const userPayload = {
      email: 'testing@domain.com',
      password: 'testPassw0rd',
    };
    
    before(async () => await createNewUser(userPayload));

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
    
    before(async () => await createNewUser(userPayload));

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
    
    before(async () => await createNewUser(userPayload));

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
    const userPayload = {
      name: "Teste da Silva",
      email: 'testing@domain.com',
      password: 'testPassw0rd',
    };
    
    before(async () => {
      await dbConnect();
      await createNewUser(userPayload);
    });

    after(async () => {
      await dbDisconnect();
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
