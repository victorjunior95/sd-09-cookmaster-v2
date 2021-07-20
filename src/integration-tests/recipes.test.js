const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

describe('RECIPES', () => {
  describe('POST /recipes', () => {
    describe('SUCESSO', () => {
      let response;
      let connectionMock;
      const DBServer = new MongoMemoryServer();

      before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users').insertOne({
          name: 'admin',
          email: 'root@email.com',
          password: 'admin',
        });

        const JWT_TOKEN = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'root@email.com',
            password: 'admin',
          })
          .then(({ body }) => body.token);

        response = await chai
          .request(app)
          .post('/recipes')
          .set({
            authorization: JWT_TOKEN,
          })
          .send({
            name: 'name-test-success',
            ingredients: 'ingredients-test-success',
            preparation: 'preparation-test-success',
          });
      });

      after(async () => {
        connectionMock
          .db('Cookmaster')
          .collection('users')
          .deleteOne({ name: 'admin' });

        MongoClient.connect.restore();
        await DBServer.stop();
      });

      it('retorna o código 201', () => {
        expect(response).to.have.status(201);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto retornado tem a chave "recipe"', () => {
        expect(response.body).to.include.a.key('recipe');
      });

      it('a chave "recipe" deve ser um objeto', () => {
        expect(response.body.recipe).to.be.an('object');
      });

      it('objeto retornado tem todas as chaves esperadas', () => {
        expect(response.body.recipe).to.include.all.keys(
          'name',
          'ingredients',
          'preparation',
          'userId',
          '_id'
        );
      });
    });

    describe('FALHA', () => {
      let connectionMock;
      let JWT_TOKEN;
      const DBServer = new MongoMemoryServer();
      const MISSING_ENTRY_MESSAGE = 'Invalid entries. Try again.';

      before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users').insertOne({
          name: 'admin',
          email: 'root@email.com',
          password: 'admin',
        });

        JWT_TOKEN = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'root@email.com',
            password: 'admin',
          })
          .then(({ body }) => body.token);
      });

      after(async () => {
        await connectionMock.db('Cookmaster').collection('users').deleteOne({
          name: 'admin',
        });

        MongoClient.connect.restore();
        await DBServer.stop();
      });

      describe('Quando o campo "name" não é inserido', () => {
        let response;

        before(async () => {
          response = await chai
            .request(app)
            .post('/recipes')
            .set({
              authorization: JWT_TOKEN,
            })
            .send({
              ingredients: 'ingredients-test-fail',
              preparation: 'preparation-test-fail',
            });
        });

        it('retorna o código 400', () => {
          expect(response).to.have.status(400);
        });

        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('o objeto retornado deve ter a chave "message"', () => {
          expect(response.body).to.include.a.key('message');
        });

        it('a chave "message" deve ter o valor esperado', () => {
          expect(response.body.message).to.be.equal(MISSING_ENTRY_MESSAGE);
        });
      });

      describe('Quando o campo "ingredients" não é inserido', () => {
        let response;
        before(async () => {
          response = await chai
            .request(app)
            .post('/recipes')
            .set({
              authorization: JWT_TOKEN,
            })
            .send({
              name: 'name-test-fail',
              preparation: 'preparation-test-fail',
            });
        });

        it('retorna o código 400', () => {
          expect(response).to.have.status(400);
        });

        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('o objeto retornado deve ter a chave "message"', () => {
          expect(response.body).to.include.a.key('message');
        });

        it('a chave "message" deve ter o valor esperado', () => {
          expect(response.body.message).to.be.equal(MISSING_ENTRY_MESSAGE);
        });
      });

      describe('Quando o campo "preparation" não é inserido', () => {
        let response;
        before(async () => {
          response = await chai
            .request(app)
            .post('/recipes')
            .set({
              authorization: JWT_TOKEN,
            })
            .send({
              name: 'name-test-fail',
              ingredients: 'ingredients-test-fail',
            });
        });

        it('retorna o código 400', () => {
          expect(response).to.have.status(400);
        });

        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('o objeto retornado deve ter a chave "message"', () => {
          expect(response.body).to.include.a.key('message');
        });

        it('a chave "message" deve ter o valor esperado', () => {
          expect(response.body.message).to.be.equal(MISSING_ENTRY_MESSAGE);
        });
      });
    });
  });

  describe('GET /recipes', () => {
    describe('SUCESSO', () => {
      let response;
      let connectionMock;
      const DBServer = new MongoMemoryServer();

      before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .deleteMany({});

        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .insertMany([
            {
              name: 'name-test-fail',
              ingredients: 'ingredients-test-fail',
              preparation: 'preparation-test-fail',
            },
            {
              name: 'name-test-fail',
              ingredients: 'ingredients-test-fail',
              preparation: 'preparation-test-fail',
            },
          ]);

        response = await chai.request(app).get('/recipes');
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
      });

      it('retorna o código 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('array');
      });

      it('o objeto retornado tem a chave "user', () => {
        expect(response.body.length).to.be.equal(2);
      });
    });
  });

  describe('GET /recipes/:id', () => {
    describe('SUCESSO', () => {
      let response;
      let connectionMock;
      const DBServer = new MongoMemoryServer();

      before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .deleteMany({});
        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .insertMany([
            {
              name: 'name-test-fail',
              ingredients: 'ingredients-test-fail',
              preparation: 'preparation-test-fail',
              userId: 'mock-id',
            },
            {
              name: 'name-test-fail',
              ingredients: 'ingredients-test-fail',
              preparation: 'preparation-test-fail',
              userId: 'mock-id',
            },
          ]);

        const id = await chai
          .request(app)
          .get('/recipes')
          .then((response) => response.body[0]['_id']);

        response = await chai.request(app).get(`/recipes/${id}`);
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
      });

      it('retorna o código 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto que tem as chaves esperadas', () => {
        expect(response.body)
          .to.be.an('object')
          .which.includes.all.keys(
            '_id',
            'name',
            'ingredients',
            'preparation',
            'userId'
          );
      });
    });

    describe('FALHA', () => {
      let response;
      let connectionMock;
      const DBServer = new MongoMemoryServer();
      const NOT_FOUND_MESSAGE = 'recipe not found';

      before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .deleteMany({});
        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .insertMany([
            {
              name: 'name-test-fail',
              ingredients: 'ingredients-test-fail',
              preparation: 'preparation-test-fail',
              userId: 'mock-id',
            },
            {
              name: 'name-test-fail',
              ingredients: 'ingredients-test-fail',
              preparation: 'preparation-test-fail',
              userId: 'mock-id',
            },
          ]);

        const id = 'invalid_id';

        response = await chai.request(app).get(`/recipes/${id}`);
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
      });

      it('retorna o código 404', () => {
        expect(response).to.have.status(404);
      });

      it('retorna um objeto que tem as chave "message"', () => {
        expect(response.body).to.be.an('object').which.have.a.key('message');
      });

      it('a chave "message" do objeto retornado deve ter o valor esperado', () => {
        expect(response.body.message).to.be.equal(NOT_FOUND_MESSAGE);
      });
    });
  });

  describe('PUT /recipes/:id', () => {
    describe('SUCESSO', () => {
      let response;
      let connectionMock;
      const DBServer = new MongoMemoryServer();

      describe('Quando o usuário está autenticado', () => {
        before(async () => {
          const URLMock = await DBServer.getUri();
          connectionMock = await MongoClient.connect(URLMock, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock
            .db('Cookmaster')
            .collection('recipes')
            .deleteMany({});

          await connectionMock.db('Cookmaster').collection('users').insertOne({
            name: 'name-test-success',
            email: 'email@email.com',
            password: 'password-test-success',
            _id: 'user-id',
          });

          await connectionMock
            .db('Cookmaster')
            .collection('recipes')
            .insertOne({
              name: 'name-test-success',
              ingredients: 'ingredients-test-success',
              preparation: 'preparation-test-success',
              userId: 'user-id',
            });

          const JWT_TOKEN = await chai
            .request(app)
            .post('/login')
            .send({
              email: 'email@email.com',
              password: 'password-test-success',
            })
            .then(({ body }) => body.token);

          const id = await chai
            .request(app)
            .get('/recipes')
            .then((response) => response.body[0]['_id']);

          response = await chai
            .request(app)
            .put(`/recipes/${id}`)
            .set({
              authorization: JWT_TOKEN,
            })
            .send({
              name: 'successful-update',
              ingredients: 'successful-update',
              preparation: 'successful-update',
            });
        });

        after(async () => {
          await connectionMock
            .db('Cookmaster')
            .collection('recipes')
            .deleteMany({});

          await connectionMock.db('Cookmaster').collection('users').deleteOne({
            name: 'admin',
          });

          MongoClient.connect.restore();
          await DBServer.stop();
        });

        it('retorna o código 200', () => {
          expect(response).to.have.status(200);
        });

        it('retorna um objeto que tem as chaves esperadas', () => {
          expect(response.body)
            .to.be.an('object')
            .which.includes.all.keys(
              '_id',
              'name',
              'ingredients',
              'preparation',
              'userId'
            );
        });

        it('as chaves "name", "ingredients", "preparation" do objeto retornado devem ter o valor "successful-update"', () => {
          expect(response.body.name).to.be.equal('successful-update');
          expect(response.body.ingredients).to.be.equal('successful-update');
          expect(response.body.preparation).to.be.equal('successful-update');
        });
      });

      describe('Quando o usuário é admin', () => {
        before(async () => {
          const URLMock = await DBServer.getUri();
          connectionMock = await MongoClient.connect(URLMock, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock
            .db('Cookmaster')
            .collection('recipes')
            .deleteMany({});

          await connectionMock.db('Cookmaster').collection('users').insertOne({
            name: 'admin',
            email: 'root@email.com',
            password: 'admin',
            role: 'admin',
          });

          await connectionMock
            .db('Cookmaster')
            .collection('recipes')
            .insertOne({
              name: 'name-test-success',
              ingredients: 'ingredients-test-success',
              preparation: 'preparation-test-success',
              userId: 'mock-id',
            });

          const JWT_TOKEN = await chai
            .request(app)
            .post('/login')
            .send({
              email: 'root@email.com',
              password: 'admin',
            })
            .then(({ body }) => body.token);

          const id = await chai
            .request(app)
            .get('/recipes')
            .then((response) => response.body[0]['_id']);

          response = await chai
            .request(app)
            .put(`/recipes/${id}`)
            .set({
              authorization: JWT_TOKEN,
            })
            .send({
              name: 'successful-update',
              ingredients: 'successful-update',
              preparation: 'successful-update',
            });
        });

        after(async () => {
          await connectionMock
            .db('Cookmaster')
            .collection('recipes')
            .deleteMany({});

          await connectionMock.db('Cookmaster').collection('users').deleteOne({
            name: 'admin',
          });

          MongoClient.connect.restore();
          await DBServer.stop();
        });

        it('retorna o código 200', () => {
          expect(response).to.have.status(200);
        });

        it('retorna um objeto que tem as chaves esperadas', () => {
          expect(response.body)
            .to.be.an('object')
            .which.includes.all.keys(
              '_id',
              'name',
              'ingredients',
              'preparation',
              'userId'
            );
        });

        it('as chaves "name", "ingredients", "preparation" do objeto retornado devem ter o valor "successful-update"', () => {
          expect(response.body.name).to.be.equal('successful-update');
          expect(response.body.ingredients).to.be.equal('successful-update');
          expect(response.body.preparation).to.be.equal('successful-update');
        });
      });
    });

    describe('FALHA', () => {
      let response;
      let JWT_TOKEN;
      let id;
      let connectionMock;
      const DBServer = new MongoMemoryServer();

      before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .deleteMany({});

        await connectionMock.db('Cookmaster').collection('users').insertOne({
          name: 'admin',
          email: 'root@email.com',
          password: 'admin',
          role: 'admin',
        });

        await connectionMock.db('Cookmaster').collection('recipes').insertOne({
          name: 'name-test-success',
          ingredients: 'ingredients-test-success',
          preparation: 'preparation-test-success',
          userId: 'mock-id',
        });

        JWT_TOKEN = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'root@email.com',
            password: 'admin',
          })
          .then(({ body }) => body.token);

        id = await chai
          .request(app)
          .get('/recipes')
          .then((response) => response.body[0]['_id']);
      });

      after(async () => {
        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .deleteMany({});

        await connectionMock.db('Cookmaster').collection('users').deleteOne({
          name: 'admin',
        });

        MongoClient.connect.restore();
        await DBServer.stop();
      });

      describe('Quando o usuário não está autenticado', () => {
        before(async () => {
          response = await chai.request(app).put(`/recipes/${id}`).send({
            name: 'fail-update',
            ingredients: 'fail-update',
            preparation: 'fail-update',
          });
        });

        it('retorna o código 401', () => {
          expect(response).to.have.status(401);
        });

        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('o objeto retornado possui a chave message', () => {
          expect(response.body).to.include.a.key('message');
        });

        it('a chame "message" do objeto retornado deve possuir o valor esperado', () => {
          expect(response.body.message).to.be.equal('missing auth token');
        });
      });

      describe('Quando o token é invalido', () => {
        before(async () => {
          response = await chai
            .request(app)
            .put(`/recipes/${id}`)
            .set({
              authorization: 1234567890,
            })
            .send({
              name: 'fail-update',
              ingredients: 'fail-update',
              preparation: 'fail-update',
            });
        });

        it('retorna o código 401', () => {
          expect(response).to.have.status(401);
        });

        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('o objeto retornado possui a chave message', () => {
          expect(response.body).to.include.a.key('message');
        });

        it('a chame "message" do objeto retornado deve possuir o valor esperado', () => {
          expect(response.body.message).to.be.equal('jwt malformed');
        });
      });
    });
  });

  describe('DELETE /recipes/:id', () => {
    describe('SUCESSO', () => {
      let response;
      let connectionMock;
      const DBServer = new MongoMemoryServer();

      describe('Quando o usuário está autenticado', () => {
        before(async () => {
          const URLMock = await DBServer.getUri();
          connectionMock = await MongoClient.connect(URLMock, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock
            .db('Cookmaster')
            .collection('recipes')
            .deleteMany({});

          await connectionMock.db('Cookmaster').collection('users').insertOne({
            name: 'name-test-success',
            email: 'email@email.com',
            password: 'password-test-success',
            _id: 'user-id',
          });

          await connectionMock
            .db('Cookmaster')
            .collection('recipes')
            .insertOne({
              name: 'name-test-success',
              ingredients: 'ingredients-test-success',
              preparation: 'preparation-test-success',
              userId: 'user-id',
            });

          const JWT_TOKEN = await chai
            .request(app)
            .post('/login')
            .send({
              email: 'email@email.com',
              password: 'password-test-success',
            })
            .then(({ body }) => body.token);

          const id = await chai
            .request(app)
            .get('/recipes')
            .then((response) => response.body[0]['_id']);

          response = await chai
            .request(app)
            .delete(`/recipes/${id}`)
            .set({
              authorization: JWT_TOKEN,
            })
        });

        after(async () => {
          await connectionMock
            .db('Cookmaster')
            .collection('recipes')
            .deleteMany({});

          await connectionMock.db('Cookmaster').collection('users').deleteOne({
            name: 'admin',
          });

          MongoClient.connect.restore();
          await DBServer.stop();
        });

        it('retorna o código 204', () => {
          expect(response).to.have.status(204);
        });

        it('não retorna conteúdo', () => {
          expect(response.body).to.be.empty
        });
      });

      describe('Quando o usuário é admin', () => {
        before(async () => {
          const URLMock = await DBServer.getUri();
          connectionMock = await MongoClient.connect(URLMock, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

          sinon.stub(MongoClient, 'connect').resolves(connectionMock);

          await connectionMock
            .db('Cookmaster')
            .collection('recipes')
            .deleteMany({});

          await connectionMock.db('Cookmaster').collection('users').insertOne({
            name: 'admin',
            email: 'root@email.com',
            password: 'admin',
            role: 'admin',
          });

          await connectionMock
            .db('Cookmaster')
            .collection('recipes')
            .insertOne({
              name: 'name-test-success',
              ingredients: 'ingredients-test-success',
              preparation: 'preparation-test-success',
              userId: 'mock-id',
            });

          const JWT_TOKEN = await chai
            .request(app)
            .post('/login')
            .send({
              email: 'root@email.com',
              password: 'admin',
            })
            .then(({ body }) => body.token);

          const id = await chai
            .request(app)
            .get('/recipes')
            .then((response) => response.body[0]['_id']);

          response = await chai
            .request(app)
            .delete(`/recipes/${id}`)
            .set({
              authorization: JWT_TOKEN,
            })
        });

        after(async () => {
          await connectionMock
            .db('Cookmaster')
            .collection('recipes')
            .deleteMany({});

          await connectionMock.db('Cookmaster').collection('users').deleteOne({
            name: 'admin',
          });

          MongoClient.connect.restore();
          await DBServer.stop();
        });

        it('retorna o código 204', () => {
          expect(response).to.have.status(204);
        });

        it('não retorna conteúdo', () => {
          expect(response.body).to.be.empty;
        });
      });
    });

    describe('FALHA', () => {
      let response;
      let id;
      let connectionMock;
      const DBServer = new MongoMemoryServer();

      before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .deleteMany({});

        await connectionMock.db('Cookmaster').collection('users').insertOne({
          name: 'admin',
          email: 'root@email.com',
          password: 'admin',
          role: 'admin',
        });

        await connectionMock.db('Cookmaster').collection('recipes').insertOne({
          name: 'name-test-success',
          ingredients: 'ingredients-test-success',
          preparation: 'preparation-test-success',
          userId: 'mock-id',
        });

        id = await chai
          .request(app)
          .get('/recipes')
          .then((response) => response.body[0]['_id']);
      });

      after(async () => {
        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .deleteMany({});

        await connectionMock.db('Cookmaster').collection('users').deleteOne({
          name: 'admin',
        });

        MongoClient.connect.restore();
        await DBServer.stop();
      });

      describe('Quando o usuário não está autenticado', () => {
        before(async () => {
          response = await chai.request(app).delete(`/recipes/${id}`).send({
            name: 'fail-update',
            ingredients: 'fail-update',
            preparation: 'fail-update',
          });
        });

        it('retorna o código 401', () => {
          expect(response).to.have.status(401);
        });

        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('o objeto retornado possui a chave message', () => {
          expect(response.body).to.include.a.key('message');
        });

        it('a chame "message" do objeto retornado deve possuir o valor esperado', () => {
          expect(response.body.message).to.be.equal('missing auth token');
        });
      });

      describe('Quando o token é invalido', () => {
        before(async () => {
          response = await chai
            .request(app)
            .delete(`/recipes/${id}`)
            .set({
              authorization: 1234567890,
            })
            .send({
              name: 'fail-update',
              ingredients: 'fail-update',
              preparation: 'fail-update',
            });
        });

        it('retorna o código 401', () => {
          expect(response).to.have.status(401);
        });

        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('o objeto retornado possui a chave message', () => {
          expect(response.body).to.include.a.key('message');
        });

        it('a chame "message" do objeto retornado deve possuir o valor esperado', () => {
          expect(response.body.message).to.be.equal('jwt malformed');
        });
      });
    });
  });
  
  describe('GET /recipes/:id', () => {
    describe('SUCESSO', () => {
      let response;
      let connectionMock;
      const DBServer = new MongoMemoryServer();

      before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .deleteMany({});
        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .insertMany([
            {
              name: 'name-test-fail',
              ingredients: 'ingredients-test-fail',
              preparation: 'preparation-test-fail',
              userId: 'mock-id',
            },
            {
              name: 'name-test-fail',
              ingredients: 'ingredients-test-fail',
              preparation: 'preparation-test-fail',
              userId: 'mock-id',
            },
          ]);

        const id = await chai
          .request(app)
          .get('/recipes')
          .then((response) => response.body[0]['_id']);

        response = await chai.request(app).get(`/recipes/${id}`);
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
      });

      it('retorna o código 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto que tem as chaves esperadas', () => {
        expect(response.body)
          .to.be.an('object')
          .which.includes.all.keys(
            '_id',
            'name',
            'ingredients',
            'preparation',
            'userId'
          );
      });
    });

    describe('FALHA', () => {
      let response;
      let connectionMock;
      const DBServer = new MongoMemoryServer();
      const NOT_FOUND_MESSAGE = 'recipe not found';

      before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .deleteMany({});
        await connectionMock
          .db('Cookmaster')
          .collection('recipes')
          .insertMany([
            {
              name: 'name-test-fail',
              ingredients: 'ingredients-test-fail',
              preparation: 'preparation-test-fail',
              userId: 'mock-id',
            },
            {
              name: 'name-test-fail',
              ingredients: 'ingredients-test-fail',
              preparation: 'preparation-test-fail',
              userId: 'mock-id',
            },
          ]);

        const id = 'invalid_id';

        response = await chai.request(app).get(`/recipes/${id}`);
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
      });

      it('retorna o código 404', () => {
        expect(response).to.have.status(404);
      });

      it('retorna um objeto que tem as chave "message"', () => {
        expect(response.body).to.be.an('object').which.have.a.key('message');
      });

      it('a chave "message" do objeto retornado deve ter o valor esperado', () => {
        expect(response.body.message).to.be.equal(NOT_FOUND_MESSAGE);
      });
    });
  });
});
