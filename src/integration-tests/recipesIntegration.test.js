const chai = require('chai');
const sinon = require('sinon');
const app = require('../api/app');
const { getConnection } = require('./connectionMock');
const { ObjectId } = require('mongodb');

const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const { expect } = chai;

const VALID_ID_1 = '60f1d53698119292e446c0c8';
const VALID_ID_2 = '60f1ce4265bb9386d28fb454';
const VALID_ID_3 = '60f1ce4265bb9386d28fb400';

const VALID_RECIPE = {
  _id: ObjectId(VALID_ID_1),
  name: 'Nome da Receita',
  ingredients: 'Lista de Ingredientes',
  preparation: 'Lista do que fazer',
  userId: ObjectId(VALID_ID_2),
};

describe('Testes para a rota /recipes', () => {
  describe('Testes para o endpoint POST /', () => {
    describe('Quando a requisição é malsucedida', () => {
      describe('Quando não temos um token', () => {
        let response;

        before(async () => {
          response = await chai.request(app).post('/recipes').send({}).set({});
        });

        it('deve retornar um codigo 401', () => {
          expect(response).to.have.status(401);
        });
        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('missing auth token');
        });
      });
      describe('Quando o token é invalido', () => {
        let response;

        before(async () => {
          response = await chai.request(app).post('/recipes').send({}).set({ authorization: 'malformedToken' });
        });

        it('deve retornar um codigo 401', () => {
          expect(response).to.have.status(401);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('jwt malformed');
        });
      });
      describe('Quando não fornecemos os dados corretamente', () => {
        let connectionMock;
        let response;
        let loginData;
        let token;

        before(async () => {
          connectionMock = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock.db('Cookmaster').collection('users')
            .insertOne({ name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021', role: 'user' });

          loginResponse = await chai.request(app).post('/login')
            .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });

          token = loginResponse.body.token;

          response = await chai.request(app).post('/recipes').send({}).set({ authorization: token });
        });

        after(async () => {
          MongoClient.connect.restore();
          await connectionMock.db('Cookmaster').collection('users').deleteMany({});
        });

        it('deve retornar o codigo HTTP 400', () => {
          expect(response).to.have.status(400);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('Invalid entries. Try again.');
        });
      });
      // fim das requisições malsucedidas
    });
    describe('Quando cadastramos uma receita com sucesso', () => {
      let connectionMock;
      let response;
      let loginData;
      let token;

      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users')
          .insertOne({ name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021', role: 'user' });

        loginResponse = await chai.request(app).post('/login')
          .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });

        token = loginResponse.body.token;

        response = await chai.request(app).post('/recipes')
          .send({ name: 'Nome da receita', ingredients: 'Lista de ingredientes', preparation: 'Como fazer' })
          .set({ authorization: token });
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteMany({});
        await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      });

      it('deve receber o status code 201', () => {
        expect(response).to.have.status(201);
      });

      it('deve receber um objeto body com a chave recipe como resposta', () => {
        expect(response.body).to.be.an('object').to.have.property('recipe');
      });

      it('o objeto recipe deve ter as chaves referentes aos dados da receita e seu responsável', () => {
        expect(response.body.recipe).to.be.an('object').to.have.all.keys('name', 'ingredients', 'preparation', 'userId', '_id');
      });
    });
    // fim do endpoint POST /
  });
  describe('Testes para o endpoint GET /', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(app).get('/recipes');
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
    });

    it('deve receber um codigo HTTP 200', () => {
      expect(response).to.have.status(200);
    });

    it('deve receber um array com as receitas cadastradas', () => {
      expect(response.body).to.be.an('array');
    });

    // fim do endpoint GET /
  });
  describe('Testes para o endpoint GET /:id', () => {
    describe('Quando não encontramos nenhuma receita com o ID informado', () => {
      let connectionMock;
      let response;

      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        response = await chai.request(app).get(`/recipes/${VALID_ID_1}`);
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('recipes')
          .deleteMany({});
      });

      it('deve retornar o codigo HTTP 404', () => {
        expect(response).to.have.status(404);
      });

      it('deve retornar um objeto no body com a key "message"', () => {
        expect(response.body).to.be.an('object').to.have.property('message');
      });

      it('deve retornar a mensagem de erro correta', () => {
        expect(response.body.message).to.be.equal('recipe not found');
      });
    });
    describe('Quando encontramos uma receita', () => {
      let connectionMock;
      let response;
      let recipeList;
      let myrecipe;

      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('recipes')
          .insertOne(VALID_RECIPE);

        response = await chai.request(app).get(`/recipes/${VALID_ID_1}`).send({});
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('recipes')
          .deleteMany({});
      });

      it('deve retornar com status HTTP 200', async () => {
        expect(response).to.have.status(200);
      });

      it('deve retornar um objeto no body com a key "message"', () => {
        expect(response.body).to.be.an('object');
      });

      it('deve retornar um objeto com as chaves da receita encontrada', () => {
        expect(response.body).to.have.all.keys('_id', 'name', 'ingredients', 'preparation', 'userId');
      });
    });
    // fim do endpoint GET /:id
  });
  describe('Testes para o endpoint PUT /:id', () => {
    describe('Quando a requisição é malsucedida', () => {
      describe('Quando não temos um token', () => {
        let response;

        before(async () => {
          response = await chai.request(app).put(`/recipes/${VALID_ID_1}`).send({}).set({});
        });

        it('deve retornar um codigo 401', () => {
          expect(response).to.have.status(401);
        });
        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('missing auth token');
        });
      });
      describe('Quando não encontramos uma receita', () => {
        let connectionMock;
        let response;
        let loginData;
        let token;

        before(async () => {
          connectionMock = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock.db('Cookmaster').collection('users')
            .insertOne({ name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021', role: 'user' });

          loginResponse = await chai.request(app).post('/login')
            .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });

          token = loginResponse.body.token;

          response = await chai.request(app).put(`/recipes/${VALID_ID_1}`)
            .send({ name: 'Novo nome', ingredients: 'Lista de ingredientes', preparation: 'Como fazer' })
            .set({ authorization: token });
        });

        after(async () => {
          MongoClient.connect.restore();
          await connectionMock.db('Cookmaster').collection('users').deleteMany({});
        });

        it('deve retornar um codigo HTTP 404', () => {
          expect(response).to.have.status(404);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('recipe not found');
        });
      });
      describe('Quando não é o dono da receita ou admin', () => {
        let connectionMock;
        let response;
        let loginData;
        let token;

        before(async () => {
          connectionMock = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock.db('Cookmaster').collection('users')
            .insertOne({ _id: ObjectId(VALID_ID_3), name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021', role: 'user' });

          loginResponse = await chai.request(app).post('/login')
            .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });

          token = loginResponse.body.token;

          await connectionMock.db('Cookmaster').collection('recipes')
            .insertOne(VALID_RECIPE);
          response = await chai.request(app).put(`/recipes/${VALID_ID_1}`)
            .send({ name: 'Nome da receita', ingredients: 'Lista de ingredientes', preparation: 'Lista do que fazer' })
            .set({ authorization: token });
        });

        after(async () => {
          MongoClient.connect.restore();
          await connectionMock.db('Cookmaster').collection('users').deleteMany({});
          await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
        });

        it('deve retornar codigo HTTP 401', () => {
          expect(response).to.have.status(401);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('Unauthorized');
        });
      });
      describe('Quando não houve nenhuma mudança a ser feita', () => {
        let connectionMock;
        let response;
        let loginData;
        let token;

        before(async () => {
          connectionMock = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock.db('Cookmaster').collection('users')
            .insertOne({ _id: ObjectId(VALID_ID_2), name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021', role: 'user' });

          loginResponse = await chai.request(app).post('/login')
            .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });

          token = loginResponse.body.token;

          await connectionMock.db('Cookmaster').collection('recipes')
            .insertOne(VALID_RECIPE);
          response = await chai.request(app).put(`/recipes/${VALID_ID_1}`)
            .send({ name: 'Nome da Receita', ingredients: 'Lista de Ingredientes', preparation: 'Lista do que fazer' })
            .set({ authorization: token });
        });

        after(async () => {
          MongoClient.connect.restore();
          await connectionMock.db('Cookmaster').collection('users').deleteMany({});
          await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
        });

        it('deve retornar um codigo HTTP 400', () => {
          expect(response).to.have.status(400);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('Não foi possivel atualizar');
        });
      });
    });
    describe('Quando modificamos uma receita com sucesso', () => {
      let connectionMock;
      let response;
      let loginData;
      let token;

      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users')
          .insertOne({ _id: ObjectId(VALID_ID_2), name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021', role: 'user' });

        loginResponse = await chai.request(app).post('/login')
          .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });

        token = loginResponse.body.token;

        await connectionMock.db('Cookmaster').collection('recipes')
          .insertOne(VALID_RECIPE);
        response = await chai.request(app).put(`/recipes/${VALID_ID_1}`)
          .send({ name: 'Novo nome da Receita', ingredients: 'Lista de Ingredientes', preparation: 'Lista do que fazer' })
          .set({ authorization: token });
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteMany({});
        await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      });

      it('deve retornar um codigo HTTP 200', () => {
        expect(response).to.have.status(200);
      });

      it('deve retornar um objeto no body com os dados novos da receita ', () => {
        expect(response.body).to.be.an('object').to.have.all.keys('_id', 'name', 'ingredients', 'preparation', 'userId');
      });
    });
    // fim do endpoint PUT /:id
  });
  describe('Testes para o endpoint DELETE /:id', () => {
    describe('Quando a requisição foi mal sucedida', () => {
      describe('Quando não temos um token', () => {
        let response;

        before(async () => {
          response = await chai.request(app).delete(`/recipes/${VALID_ID_1}`).send({}).set({});
        });

        it('deve retornar um codigo 401', () => {
          expect(response).to.have.status(401);
        });
        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('missing auth token');
        });
      });
      describe('Quando não encontramos uma receita', () => {
        let connectionMock;
        let response;
        let loginData;
        let token;

        before(async () => {
          connectionMock = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock.db('Cookmaster').collection('users')
            .insertOne({ name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021', role: 'user' });

          loginResponse = await chai.request(app).post('/login')
            .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });

          token = loginResponse.body.token;

          response = await chai.request(app).delete(`/recipes/${VALID_ID_1}`)
            .set({ authorization: token });
        });

        after(async () => {
          MongoClient.connect.restore();
          await connectionMock.db('Cookmaster').collection('users').deleteMany({});
        });

        it('deve retornar um codigo HTTP 404', () => {
          expect(response).to.have.status(404);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('recipe not found');
        });
      });
      describe('Quando não é o dono da receita ou admin', () => {
        let connectionMock;
        let response;
        let loginData;
        let token;

        before(async () => {
          connectionMock = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock.db('Cookmaster').collection('users')
            .insertOne({ _id: ObjectId(VALID_ID_3), name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021', role: 'user' });

          loginResponse = await chai.request(app).post('/login')
            .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });

          token = loginResponse.body.token;

          await connectionMock.db('Cookmaster').collection('recipes')
            .insertOne(VALID_RECIPE);
          response = await chai.request(app).delete(`/recipes/${VALID_ID_1}`)
            .set({ authorization: token });
        });

        after(async () => {
          MongoClient.connect.restore();
          await connectionMock.db('Cookmaster').collection('users').deleteMany({});
          await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
        });

        it('deve retornar codigo HTTP 401', () => {
          expect(response).to.have.status(401);
        });

        it('deve retornar um objeto no body com a key "message"', () => {
          expect(response.body).to.be.an('object').to.have.property('message');
        });

        it('deve retornar a mensagem de erro correta', () => {
          expect(response.body.message).to.be.equal('Unauthorized');
        });
      });
    });
    describe('Quando apagamos uma receita com sucesso', () => {
      let connectionMock;
      let response;
      let loginData;
      let token;

      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users')
          .insertOne({ _id: ObjectId(VALID_ID_2), name: 'Yoneda', email: 'yoneda@trybe.com', password: 'trybe2021', role: 'user' });

        loginResponse = await chai.request(app).post('/login')
          .send({ email: 'yoneda@trybe.com', password: 'trybe2021' });

        token = loginResponse.body.token;

        await connectionMock.db('Cookmaster').collection('recipes')
          .insertOne(VALID_RECIPE);
        response = await chai.request(app).delete(`/recipes/${VALID_ID_1}`)
          .set({ authorization: token });
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteMany({});
        await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      });

      it('deve retornar um codigo HTTP 204', () => {
        expect(response).to.have.status(204);
      });

      it('deve retornar um objeto no body com os dados novos da receita ', () => {
        expect(response.body).to.be.empty;
      });
    });
    // fim do endpoint DELETE /:id
  });
});