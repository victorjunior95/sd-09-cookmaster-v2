const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', async () => {
   
  describe('quando é criado com sucesso', () => {
    let response = {};
    
    const DBServer = new MongoMemoryServer();
    
    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
        );
        
        sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
        
        response = await chai.request(server)
        .post('/users')
        .send({
          "name": "Pipocin",
            "email": "patinhofurioso@bol.com",
            "password": "aloalo"
          });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
    
    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

  })
  describe('caso algum campo não esteja preenchido', () => {
      before(async () => {
        response = await chai.request(server)
        .post('/users')
        .send({
          "name": "Pipocin",
          "email": "patinhofurioso@bol.com",
        });
    });

    it('retorna um erro com status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna uma mensagem de erro com "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });
});

describe('POST /login', async () => {
  let response = {};
    
  const DBServer = new MongoMemoryServer();
  
  before(async () => {
    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true }
      );
      
      sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);
      
      response = await chai.request(server)
      .post('/users')
      .send({
        "name": "Pipocin",
          "email": "patinhofurioso@bol.com",
          "password": "aloalo"
        });
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('If the user exists', () => {
    describe('When all the data is correct', () => {
      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send({
            "email": "patinhofurioso@bol.com",
            "password": "aloalo"
          });
      });
      it('Shoud return status 200', () => {
        expect(response).to.have.status(200);
      });
      it('Should return a token', () => {
        expect(response.body).to.have.property('token');
      });
    });
    describe('When the data is incorrect', () => {
      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send({
            "email": "patinhofurioso@bol.com",
            "password": "senhaincorreta"
          });
        console.log(response.body);
      });
      it('Should return status 401', () => {
        expect(response).to.have.status(401);
      })
      it('Should return an error message', () => {
        expect(response.body.message).to.be.equals('Incorrect username or password')
      });
    });
    describe('When one of the fields is missing', () => {
      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send({
            "email": "patinhofurioso@bol.com",
          });
      });
      it('Should return status 401', () => {
        expect(response).to.have.status(401);
      });
      it('Should return an error message', () => {
        expect(response.body.message).to.be.equals('All fields must be filled')
      });
    });
  });
});

describe('POST /recipes', async () => {
  let response = {};
  let token = '';
    
  const DBServer = new MongoMemoryServer();
  
  before(async () => {
    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true }
      );
      
      sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);
      
    await chai.request(server)
      .post('/users')
      .send({
        "name": "Pipocin",
        "email": "patinhofurioso@bol.com",
        "password": "aloalo"
      });
    token = await chai.request(server)
      .post('/login')
      .send({
        "email": "patinhofurioso@bol.com",
        "password": "aloalo"
      }).then(result => result.body.token);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('If the user is logged in', () => {
    describe('If the token is valid', () => {
      describe('If the data is correct', () => {
        it('Should return the recipe', async () => {

          response = await chai.request(server)
          .post('/recipes')
          .send({
            "name": "piPokinha2",
            "ingredients": "string",
            "preparation": "string"
          })
          .set('authorization', token)
          
          expect(response.body).to.have.property('recipe')
        });
      })
      describe('If a field is empty', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/recipes')
            .send({
              "name": "piPokinha2",
              "ingredients": "string",
            })
            .set('authorization', token)
        })

        it('Should return status 400', () => {
          expect(response).to.have.status(400);
        });

        it('Should return an error message', () => {
          expect(response.body.message).to.be.equals('Invalid entries. Try again.');
        });
      });
    });

    describe('If the token is invalid', () => {
      before(async () => {
        token = 9999;
        response = await chai.request(server)
          .post('/recipes')
          .send({
            "name": "piPokinha2",
            "ingredients": "string",
            "preparation": "string"
          })
          .set('authorization', token)
      });
      it('Should return status 401', () => {
        expect(response).to.have.status(401);
      });
      it('Should return an error message', () => {
        expect(response.body.message).to.be.equals('jwt malformed');
      })
    })

  });

  describe('If the user is not logged in', () => {

  })
});