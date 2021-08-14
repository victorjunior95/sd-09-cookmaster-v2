const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const server = require('../api/app');
const { getConnection } = require('./mock/connection');
const { expect } = require('chai');

let connectionMock;

const MOCK_USER = {
  name: 'xablau',
  email: 'xaxa@blaublau.com',
  password: '03902'
}

  const MOCK_USER_1 = {
    name: 'xablau',
    email: 'xaxa@blaublau.com',
    password: '450'
  }

  const RESPONSE_MOCK_USER_1 = {
    email: 'xaxa@blaublau.com',
    password: '450'
  }

  const MOCK_USER_GK = {
    name: 'Gianluigi Buffon',
    email: 'portiere@parma.com',
    password: 'goat'
  }

  const RESPONSE_MOCK_USER_GK = {
    email: 'portiere@parma.com',
    password: 'goat'
  }

describe('POST /users', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async() => {
    MongoClient.connect.restore();
  });

  describe('Quando é passado nome, email e senha corretamente', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send(MOCK_USER);
    });

    it('retorna o status 201 e um objeto com a propriedade "user"', () => {
      expect(response).to.have.status(201);
      expect(response.body).to.have.have.a.property('user');
    });
  });
});

describe('POST /login', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async() => {
    MongoClient.connect.restore();
  });

  describe('Quando o login é efetuado com sucesso', () => {
    let response;

    before(async () => {
      const DB_NAME = 'Cookmaster';
      const usersCollection = connectionMock.db(DB_NAME).collection('users');
      await usersCollection.insertOne(MOCK_USER_1);

      response = await chai.request(server)
        .post('/login')
        .send(RESPONSE_MOCK_USER_1);
    });

    it('retornar status 200 e um objeto /token/', () => {
      expect(response).to.have.status(200);
      expect(response.body).to.have.have.a.property('token');
    });
  });

  describe('email e passoword não preenchidos', () => {
    let response;

    before (async () => {
      response = await chai.request(server).post('/login').send({});
    })

    it('retorna body', () => {
      expect(response.body).to.be.an('object');
    });
  
    it('HTTP 401 é corretamente retornado', () => {
      expect(response).to.have.status(401);
    });

    it('response object has `message` property', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('possui correta mensagem', () => {
      expect(response.body.message).to.be.equal('All fields must be filled')
    });
  });

  describe('email não existente.', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server).post('/login').send({
        email: 'teste@testeee.com',
        password: '12345678',
      });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('http 401 é retornado', () => {
      expect(response).to.have.status(401);
    });

    it('retorna body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade MESSAGE', () => {
      expect(response.body).to.have.property('message');
    });

    it('mensagem tem seu corpo correto', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password')
    });
  });

  describe('login realizado com suceso', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne(MOCK_USER_GK);

      response = await chai.request(server).post('/login').send(RESPONSE_MOCK_USER_GK);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('Possui a propriedade TOKEN', () => {
      expect(response.body).to.have.property('token')
    });

    it('RETORNA O HTTP 200', () => {
      expect(response).to.have.status(200);
    });   
  });
});


describe('POST /users', () => {
    describe('Quando um usuário é criado', () => {
      let connectionMock;
      let response;
  
      before (async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  
        response = await chai.request(server).post('/users').send({
          name: 'XABLAAAAAU',
          email: 'andiamoca@misonoresoconto.com',
          password: '09123908',
        });
      })
  
      after(async () => {
        await connectionMock.db('Cookmaster').collection('users').deleteMany({});
        MongoClient.connect.restore();
      });
  
      it('propriedades do user', () => {
        expect(response.body).to.have.property('user');
      });

      it('retrona o objeto do usuário', () => {
        expect(response.body).to.be.an('object');
      });

      it('retorna HTTP 201', () => {
        expect(response).to.have.status(201);
      });  
    });
  });