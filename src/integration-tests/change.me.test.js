const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('quando eh criado com sucesso', () => {
        let response = {};
        let connectionMock;
        before(async () => {
          connectionMock = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(connectionMock);
          response = await chai.request(server).post('/users')
            .send(
              {
                "name": "Pablo Master Cook",
                "email": "pablo@gmail.com",
                "password": "biscoitooubolacha"
              })
        });
        after(async () => {
          MongoClient.connect.restore();
        });

        it('retorna o código de status 201', () => {
            expect(response).to.have.status(201);
        });

        it('retorna um objeto', () => {
            expect(response.body).to.be.a('object');
        });

        it('o objeto possui a propriedade "id"', () => {
            expect(response.body.user).to.have.property('id');
        });
  });

  describe('quando nao eh criado com sucesso', () => {
    let responses = [];
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      responses[0] = await chai.request(server).post('/users').send({});
      responses[1] = await chai.request(server).post('/users').send({"email": "pablo@gmail.com","password": "biscoitooubolacha"});
      responses[2] = await chai.request(server).post('/users').send({"name": "Pablo Master Cook","password": "biscoitooubolacha"});
      responses[3] = await chai.request(server).post('/users').send({"email": "pablo@gmail.com","name": "Pablo Master Cook"});
      responses[4] = await chai.request(server).post('/users').send({"name": "Pablo Master Cook"});
    });
    after(async () => {
      MongoClient.connect.restore();
    });

    describe('Quando os dados nao sao informados', () => {
      it('retorna o código de status 400', () => {
        expect(responses[0]).to.have.status(400);
      });
  
      it('retorna o código de status 400', () => {
          expect(responses[0]).to.have.status(400);
      });
  
      it('retorna um objeto', () => {
          expect(responses[0].body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "message"', () => {
          expect(responses[0].body).to.have.property('message');
      });
  
      it('o "message" possui o valor "Invalid entries. Try again."', () => {
        expect(responses[0].body.message).to.equal('Invalid entries. Try again.');
      });
    });
    describe('Quando nao ha nome informado', () => {
      it('retorna o código de status 400', () => {
        expect(responses[1]).to.have.status(400);
      });
  
      it('retorna o código de status 400', () => {
          expect(responses[1]).to.have.status(400);
      });
  
      it('retorna um objeto', () => {
          expect(responses[1].body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "message"', () => {
          expect(responses[1].body).to.have.property('message');
      });
  
      it('o "message" possui o valor "Invalid entries. Try again."', () => {
        expect(responses[1].body.message).to.equal('Invalid entries. Try again.');
      });
    });
    describe('Quando nao ha email informado', () => {
      it('retorna o código de status 400', () => {
        expect(responses[2]).to.have.status(400);
      });
  
      it('retorna o código de status 400', () => {
          expect(responses[2]).to.have.status(400);
      });
  
      it('retorna um objeto', () => {
          expect(responses[2].body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "message"', () => {
          expect(responses[2].body).to.have.property('message');
      });
  
      it('o "message" possui o valor "Invalid entries. Try again."', () => {
        expect(responses[2].body.message).to.equal('Invalid entries. Try again.');
      });
    });
    describe('Quando nao ha senha informada', () => {
      it('retorna o código de status 400', () => {
        expect(responses[4]).to.have.status(400);
      });
  
      it('retorna o código de status 400', () => {
          expect(responses[4]).to.have.status(400);
      });
  
      it('retorna um objeto', () => {
          expect(responses[4].body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "message"', () => {
          expect(responses[4].body).to.have.property('message');
      });
  
      it('o "message" possui o valor "Invalid entries. Try again."', () => {
        expect(responses[3].body.message).to.equal('Invalid entries. Try again.');
      });
    });
  });
});

describe('POST /login', () => {
  describe('quando eh logado com sucesso', () => {
        let response = {};
        let user = {};
        let connectionMock;
        before(async () => {
          connectionMock = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(connectionMock);
          user = await chai.request(server).post('/users').send(
            {
                "name": "Pablo Master Cook",
                "email": "pablo@gmail.com",
                "password": "biscoitooubolacha"
            })
            response = await chai.request(server).post('/login').send({
                "email": "pablo@gmail.com",
                "password": "biscoitooubolacha"
            })
        });
        after(async () => {
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
        it('o objeto possui a propriedade "token" preenchida', () => {
          expect(response.body.token).to.not.be.empty;
      });
  });

  describe('quando nao eh logado com sucesso', () => {
    let responses = [];
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      response = await chai.request(server).post('/login').send({"email": "pablogmail.com",
      "password": "bah isso eh feike tche"});
      response2 = await chai.request(server).post('/login').send({
        "password": "biscoitooubolacha"
      });
      response3 = await chai.request(server).post('/login').send({
        "email": "pablo@gmail.com"
      });
    });
    after(async () => {
      MongoClient.connect.restore();
    });

    describe('Quando os dados de login estao incorretos', () => {
      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });
  
      it('retorna um objeto', () => {
          expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "message"', () => {
          expect(response.body).to.have.property('message');
      });
  
      it('o "message" possui o valor "Incorrect username or password"', () => {
        expect(response.body.message).to.equal('Incorrect username or password');
      });
    });

    describe('Quando os dados de login estao incompletos', () => {
      it('retorna o código de status 401', () => {
        expect(response2 && response3).to.have.status(401);
      });
  
      it('retorna um objeto', () => {
          expect(response2.body && response3.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "message"', () => {
          expect(response2.body && response3.body).to.have.property('message');
      });
  
      it('o "message" possui o valor "All fields must be filled"', () => {
        expect(response2.body.message && response3.body.message).to.equal('All fields must be filled');
      });
    });
  });
});

describe('POST /recipes', () => {
  describe('quando a receita eh criada com sucesso', () => {
    let response = {};
    let token = {};
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      await chai.request(server).post('/users').send(
        {
            "name": "Pablo Master Cook",
            "email": "pablo@gmail.com",
            "password": "biscoitooubolacha"
      });
      token = await chai.request(server).post('/login').send({
            "email": "pablo@gmail.com",
            "password": "biscoitooubolacha"
      }).then((res) => res.body.token);
      response = await chai.request(server).post('/recipes').set('authorization', token).send(
        {
          "name": "Frango Perfeito",
          "ingredients": "Franguito eh claro",
          "preparation": "Prepare perfeitamente"
        });
    });
    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 201', () => {
        expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "_id"', () => {

        expect(response.body.recipe).to.have.property('_id');
    });
    
    it('o objeto possui a propriedade "userId"', () => {
      expect(response.body.recipe).to.have.property('userId');
    });
  });

  describe('quando a receita nao eh criada com sucesso', () => {
    let response = {};
    let response2 = {};
    let token = {};
    const fakeToken = 'souUmTokenFake';
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      await chai.request(server).post('/users').send(
        {
            "name": "Pablo Master Cook",
            "email": "pablo@gmail.com",
            "password": "biscoitooubolacha"
      });
      token = await chai.request(server).post('/login').send({
            "email": "pablo@gmail.com",
            "password": "biscoitooubolacha"
      }).then((res) => res.body.token);
      response = await chai.request(server).post('/recipes').set('authorization', fakeToken).send(
        {
          "name": "Frango Perfeito",
          "ingredients": "Franguito eh claro",
          "preparation": "Prepare perfeitamente"
        });
      response2 = await  chai.request(server).post('/recipes').set('authorization', token).send(
        {
          "ingredients": "Franguito eh claro",
          "preparation": "Prepare perfeitamente"
        });
    });
    after(async () => {
      MongoClient.connect.restore();
    });

    describe('Quando os dados de login estao incorretos', () => {
      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });
  
      it('retorna um objeto', () => {
          expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "message"', () => {
          expect(response.body).to.have.property('message');
      });
  
      it('o "message" possui o valor "jwt malformed"', () => {
        expect(response.body.message).to.equal('jwt malformed');
      });
    });

    describe('Quando os dados da receita estao incompletos', () => {
      it('retorna o código de status 400', () => {
        expect(response2).to.have.status(400);
      });
  
      it('retorna um objeto', () => {
          expect(response2.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade "message"', () => {
          expect(response2.body).to.have.property('message');
      });
  
      it('o "message" possui o valor "Invalid entries. Try again."', () => {
        expect(response2.body.message).to.equal('Invalid entries. Try again.');
      });
    });
  });
});
