const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const fs = require('fs');
const path = require('path');

const server = require('../api/app');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const userServices = require('../services/usersService');

chai.use(chaiHttp);

const { expect } = chai;

const adminUser = {
  "name": "root",
  "email":"root@email.com",
  "password": "admin",
  "role": "admin", 
};

const recipeModel = {
  "name": "Frango Perfeito",
  "ingredients": "Franguito eh claro",
  "preparation": "Prepare perfeitamente"
};

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

  describe('quando admin eh criado com sucesso', () => {
    let response = {};
    let connectionMock;
    let adminToken = '';
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      await userServices.addAdminUser(adminUser);
      adminToken = await chai.request(server).post('/login').send({
        "email": "root@email.com",
        "password": "admin"
    }).then((res) => res.body.token);
      response = await chai.request(server).post('/users/admin').set('authorization', adminToken)
        .send(
          {
            "name": "Pablo Master Cook",
            "email": "pabloAdmin2@hotmail.com",
            "password": "biscoitooubolacha"
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
        expect(response.body.user).to.have.property('_id');
    });

    it('o objeto possui a propriedade "role"', () => {
      expect(response.body.user).to.have.property('role');
  });

    it('o objeto possui a propriedade "role" com o valor "admin"', () => {
      expect(response.body.user.role).to.be.equal('admin');
  });
  });

  describe('quando admin nao eh criado com sucesso', () => {
    let response = {};
    let connectionMock;
    const notAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjczMzQ0MTUsImV4cCI6MTYyNzkzOTIxNX0.uu7gKP0j-quxh8MdqQS50i-4kCcIytPvXQyuJBmEkUc';
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      response = await chai.request(server).post('/users/admin').set('authorization', notAdminToken)
        .send(
          {
            "name": "Pablo Master Cook",
            "email": "pabloAdmin2@hotmail.com",
            "password": "biscoitooubolacha"
          })
    });
    after(async () => {
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

    it('o objeto possui a propriedade "message" com o valor "Only admins can register new admins"', () => {
      expect(response.body.message).to.be.equal('Only admins can register new admins');
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
      response = await chai.request(server).post('/recipes').set('authorization', token).send(recipeModel);
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
      response = await chai.request(server).post('/recipes').set('authorization', fakeToken).send(recipeModel);
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

  describe('quando a receita eh editada com sucesso', () => {
    let response = {};
    let response2 = {};
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
      response2 = await chai.request(server).post('/recipes/').set('authorization', token).send(recipeModel);
      
      response = await chai.request(server).put(`/recipes/${response2.body.recipe._id}`).set('authorization', token).send(
        {
          "name": "Frango mal Feito",
          "ingredients": "Franguito eh claro editado",
          "preparation": "Prepare porcamente editado"
        });
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

    it('o objeto possui a propriedade "_id"', () => {
        expect(response.body).to.have.property('_id');
    });
    
    it('o objeto possui a propriedade "userId"', () => {
      expect(response.body).to.have.property('userId');
    });

    it('o objeto possui a propriedade "name" com o valor esperado', () => {
      expect(response.body.name).to.be.equal('Frango mal Feito');
    });
  });

  describe('quando a receita nao eh editada com sucesso', () => {
    let response = {};
    let response2 = {};
    let response3 = {};
    let token = {};
    let fakeToken = 'Meu-token-eh-fake';
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
      response = await chai.request(server).post('/recipes').set('authorization', token).send(recipeModel);
      response2 = await chai.request(server).put(`/recipes/${response.body.recipe._id}`).send(
        {
          "name": "Frango mal Feito",
          "ingredients": "Franguito eh claro editado",
          "preparation": "Prepare porcamente editado"
        });
      response3 = await chai.request(server).put(`/recipes/${response.body.recipe._id}`).set('authorization', fakeToken).send(
        {
          "name": "Frango mal Feito",
          "ingredients": "Franguito eh claro editado",
          "preparation": "Prepare porcamente editado"
        });
    });
    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
        expect(response2 && response3).to.have.status(401);
    });

    it('retorna um objeto', () => {
        expect(response2.body && response3.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {

        expect(response2.body && response3.body).to.have.property('message');
    });
    
    it('o objeto "response2" possui a propriedade "message" com valor "missing auth token"', () => {
      expect(response2.body.message).to.be.equal('missing auth token');
    });

    it('o objeto "response3" possui a propriedade "message" com valor "jwt malformed"', () => {
      expect(response3.body.message).to.be.equal('jwt malformed');
    });
  });

  describe('quando a receita eh removida com sucesso', () => {
    let response = {};
    let responseAdmin = {};
    let recipe = {};
    let token = {};
    let adminToken = '';
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      await userServices.addAdminUser(adminUser);
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
      adminToken = await chai.request(server).post('/login').send({
        "email": "root@email.com",
        "password": "admin"
      }).then((res) => res.body.token);
      recipe = await chai.request(server).post('/recipes').set('authorization', token).send(recipeModel)
        .then((res) => res.body.recipe);
      response = await chai.request(server).delete(`/recipes/${recipe._id}`).set('authorization', token);
      recipe = await chai.request(server).post('/recipes').set('authorization', adminToken).send(recipeModel)
        .then((res) => res.body.recipe);
      responseAdmin = await chai.request(server).delete(`/recipes/${recipe._id}`).set('authorization', token);
    });
    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 204', () => {
        expect(response && responseAdmin).to.have.status(204);
    });

    it('retorna um body vazio', () => {
        expect(response.body && responseAdmin.body).to.be.empty;
    });
  });

  describe('quando a receita nao eh removida com sucesso', () => {
    let response = {};
    let responseAdmin = {};
    let responseNotFound = {};
    let recipe = {};
    let token = {};
    let adminToken = {};
    const fakeToken = 'askldhasjkldhflaksjdfh';
    const fakeAdminToken = 'aasdlkfhalkjsdfyuae';
    let connectionMock;
    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      token = await chai.request(server).post('/login').send({
            "email": "pablo@gmail.com",
            "password": "biscoitooubolacha"
      }).then((res) => res.body.token);
      adminToken = await chai.request(server).post('/login').send({
        "email": "root@email.com",
        "password": "admin"
      }).then((res) => res.body.token);
      recipe = await chai.request(server).post('/recipes').set('authorization', token).send(recipeModel)
        .then((res) => res.body.recipe);
      response = await chai.request(server).delete(`/recipes/${recipe._id}`);
    });
    after(async () => {
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
    
    it('o objeto possui a propriedade "message" com o conteudo "missing auth token"', () => {
      expect(response.body.message && response.body.message).to.be.equal('missing auth token');
    });
  });

  describe('quando receitas sao listadas com sucesso', () => {
    let response = {};
    let responseAuth = {};
    let token = {};
    let connectionMock;
    let recipe = {};
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
      recipe = await chai.request(server).post('/recipes').set('authorization', token).send(recipeModel)
        .then((res) => res.body.recipe);
      response = await chai.request(server).get('/recipes/');
      responseAuth = await chai.request(server).get('/recipes/').set('authorization', token);
    });
    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
        expect(response && responseAuth).to.have.status(200);
    });

    it('retorna um array', () => {
        expect(response.body && responseAuth.body).to.be.an('array');
    });

    it('o array nao esta vazio', () => {
      expect(response.body && responseAuth.body).to.not.be.empty;
    });

  });

  describe('quando uma receita eh listada pelo id com sucesso', () => {
    let response = {};
    let responseAuth = {};
    let token = {};
    let connectionMock;
    let recipe = {};
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
      recipe = await chai.request(server).post('/recipes').set('authorization', token).send(recipeModel)
        .then((res) => res.body.recipe);
      response = await chai.request(server).get(`/recipes/${recipe._id}`);
      responseAuth = await chai.request(server).get(`/recipes/${recipe._id}`).set('authorization', token);
    });
    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
        expect(response && responseAuth).to.have.status(200);
    });

    it('retorna um objeto', () => {
        expect(response.body && responseAuth.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "_id"', () => {
        expect(response.body && responseAuth.body).to.have.property('_id');
    });
    
    it('o objeto possui a propriedade "userId"', () => {
      expect(response.body && responseAuth.body).to.have.property('userId');
    });
  });
  
  describe('quando uma receita nao eh listada pelo id com sucesso', () => {
    let response = {};
    let responseAuth = {};
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
      response = await chai.request(server).get('/recipes/xpto5699');
      responseAuth = await chai.request(server).get('/recipes/xpto5699').set('authorization', token);
    });
    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 404', () => {
        expect(response && responseAuth).to.have.status(404);
    });

    it('retorna um objeto', () => {
        expect(response.body && responseAuth.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
        expect(response.body && responseAuth.body).to.have.property('message');
    });
    
    it('o objeto possui a propriedade "message" com o conteudo "recipe not found"', () => {
      expect(response.body.message && responseAuth.body.message).to.be.equal('recipe not found');
    });
  });

  describe('quando uma imagem eh adcionada na receita com sucesso', () => {
    let response = {};
    let token = {};
    let recipe = {};
    const photo = path.resolve(__dirname, 'ratinho.jpg')
    const contentFile = fs.createReadStream(photo);
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
      recipe = await chai.request(server).post('/recipes')
        .set('authorization', token)
        .send(recipeModel)
        .then((res) => res.body.recipe);
      response = await chai.request(server).put(`/recipes/${recipe._id}/image`)
        .set('authorization', token)
        .set('content-type', 'multipart/form-data')
        .attach('image', contentFile) ;
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

    it('o objeto possui a propriedade "_id"', () => {
        expect(response.body).to.have.property('_id');
    });
    
    it('o objeto possui a propriedade "userId"', () => {
      expect(response.body).to.have.property('userId');
    });

    it('o objeto possui a propriedade "image"', () => {
      expect(response.body).to.have.property('image');
    });
  });
});
