const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);
const { expect } = chai;

const server = require('../api/app');

const DBServer = new MongoMemoryServer();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true }

const getConnection = async () => {
  const URLMock = await DBServer.getUri();
  return MongoClient.connect(URLMock, OPTIONS); 
}

describe('1 POST /users cadastro de usuario', async () => {
  describe('quando é criado com sucesso', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'test',
          email: 'test@test.com',
        });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem de erro', () => {
      expect(response.body).to.have.property('message');
    })
  });
});

describe('2 POST /login logar usuario', async () => {
  describe('quando é logado com sucesso', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);


      await connectionMock.db('Cookmaster').collection('users').deleteMany({});

      response = await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('logado com sucesso', () => {
      expect(response).to.have.status(201);
    });
  });
});

describe('3 POST /users/admin cadastrar admin', async () => {
  describe('quando cadastra um admin', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await connectionMock.db('Cookmaster').collection('users').insertOne({
        name: 'admin',
        email: 'root@email.com',
        password: 'admin',
        role: 'admin'
      });

      response = await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('logado com sucesso', () => {
      expect(response).to.have.status(201);
    });

  });
});

describe('4 GET /recipes listar receitas', async () => {
  describe('listar todas as receitas', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').deleteMany({});

      await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const loginUser = await chai.request(server)
        .post('/login')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      await chai.request(server)
        .post('/recipes')
        .set('authorization', loginUser.body.token)
        .send({
          name: 'alho',
          ingredients: 'pao, alho, fe',
          preparation: 'coloca tudo na churrasqueira'
        });

      response = await chai.request(server)
        .get('/recipes');
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('logado com sucesso', () => {
      expect(response).to.have.status(200);
    });
  });
});

describe('5 POST /users/admin cadastrar admin', async () => {
  describe('quando cadastra um admin', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const loginUser = await chai.request(server)
        .post('/login')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const recipe = await chai.request(server)
        .post('/recipes')
        .set('authorization', loginUser.body.token)
        .send({
          name: 'alho',
          ingredients: 'pao, alho, fe',
          preparation: 'coloca tudo na churrasqueira'
        });

      response = await chai.request(server)
        .get(`/recipes/${recipe.body.recipe._id}`);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('logado com sucesso', () => {
      expect(response).to.have.status(200);
    });

    it('body é um objeto', () => {
      expect(response.body).to.be.an('object');
    });
  });
});

describe('6 POST /recipes erro ao cadastrar receita', async () => {
  describe('falta de token', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').deleteMany({});

      response = await chai.request(server)
        .post('/recipes')
        .send({});
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('falta de token', () => {
      expect(response.body).to.have.property('message');
    });
  });
});

describe('7 POST /recipes erro ao cadastrar receita', async () => {
  describe('erro ao cadastrar receita', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').deleteMany({});

      await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const loginUser = await chai.request(server)
        .post('/login')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', loginUser.body.token)
        .send({
          ingredients: 'pao, alho, fe',
          preparation: 'coloca tudo na churrasqueira'
        });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('dados insuficientes', () => {
      expect(response.body).to.have.property('message');
    });
  });
});

describe('8 PUT /recipes atualiza receita', async () => {
  describe('atualizar receita com sucesso', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').deleteMany({});

      await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const loginUserPut = await chai.request(server)
        .post('/login')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const recipePut = await chai.request(server)
        .post('/recipes')
        .set('authorization', loginUserPut.body.token)
        .send({
          name: 'pao de alho',
          ingredients: 'pao, alho, fe',
          preparation: 'coloca tudo na churrasqueira'
        });

      response = await chai.request(server)
        .put(`/recipes/${recipePut.body.recipe._id}`)
        .set('authorization', loginUserPut.body.token)
        .send({
          name: 'Receita de frango do Jacquin editado',
          ingredients: 'Frango editado',
          preparation: '10 min no forno editado',
        });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('receita atualizada com sucesso', () => {
      expect(response).to.have.status(200);
    });
  });
});

describe('9 DELETE /recipes deleta receita', async () => {
  describe('deleta receita com sucesso', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').deleteMany({});

      await chai.request(server)
        .post('/users')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const loginUserDelete = await chai.request(server)
        .post('/login')
        .send({
          name: "test",
          email: "test@test.com",
          password: "123456"
        });

      const recipeDelete = await chai.request(server)
        .post('/recipes')
        .set('authorization', loginUserDelete.body.token)
        .send({
          name: 'pao de alho',
          ingredients: 'pao, alho, fe',
          preparation: 'coloca tudo na churrasqueira'
        });

      response = await chai.request(server)
        .delete(`/recipes/${recipeDelete.body.recipe._id}`)
        .set('authorization', loginUserDelete.body.token);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('receita atualizada com sucesso', () => {
      expect(response).to.have.status(204);
    });
  });
})
