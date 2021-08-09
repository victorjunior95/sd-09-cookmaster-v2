const chai = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const path = require('path');

const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const app = require('../api/app');
const { getConnection } = require('./connectionMock');

const { expect } = require('chai');

describe('POST /recipes', () => {
  it('Será validado que não é possível cadastrar receita sem o campo "name"', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('users').insertOne({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
      role: 'user',
    });

    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'erickjacquin@gmail.com', password: '12345678' })
      .then((response) => response.body.token);

    response = await chai
      .request(app)
      .post('/recipes')
      .set('authorization', token)
      .send({
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('Invalid entries. Try again.');

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });
  });

  it('Será validado que não é possível cadastrar receita sem o campo "ingredients"', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('users').insertOne({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
      role: 'user',
    });

    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'erickjacquin@gmail.com', password: '12345678' })
      .then((response) => response.body.token);

    response = await chai
      .request(app)
      .post('/recipes')
      .set('authorization', token)
      .send({
        name: 'Frango',
        preparation: '10 minutos no forno',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('Invalid entries. Try again.');

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });
  });

  it('Será validado que não é possível cadastrar receita sem o campo "preparation"', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('users').insertOne({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
      role: 'user',
    });

    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'erickjacquin@gmail.com', password: '12345678' })
      .then((response) => response.body.token);

    response = await chai
      .request(app)
      .post('/recipes')
      .set('authorization', token)
      .send({
        name: 'Frango',
        ingredients: 'Frango, sazon',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('Invalid entries. Try again.');

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });
  });

  it('Será validado que não é possível cadastrar uma receita com token invalido', async () => {
    let response;

    response = await chai.request(app).post('/recipes');

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('missing auth token');
  });

  it('Será validado que é possível cadastrar usuário com sucesso', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('users').insertOne({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
      role: 'user',
    });

    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'erickjacquin@gmail.com', password: '12345678' })
      .then((response) => response.body.token);

    response = await chai
      .request(app)
      .post('/recipes')
      .set('authorization', token)
      .send({
        name: 'Frango',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
      });

    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('recipe');
    expect(response.body.recipe).to.not.be.empty;

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });
  });
});

describe('GET /recipes', () => {
  it('Será validado que é possível listar todas as receitas sem estar autenticado', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: '867tdc78ds876dvd78vdv',
    });

    response = await chai.request(app).get('/recipes');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.not.be.empty;

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });

  it('Será validado que é possível listar todas as receitas estando autenticado', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('users').insertOne({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
      role: 'user',
    });

    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'erickjacquin@gmail.com', password: '12345678' })
      .then((response) => response.body.token);

    response = await chai
      .request(app)
      .get('/recipes')
      .set('authorization', token);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.not.be.empty;

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });
});

describe('GET /recipes/id', () => {
  it('Será validado que é possível listar todas as receitas sem estar autenticado', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: '867tdc78ds876dvd78vdv',
    });

    const findRecipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .find()
      .toArray();

    const id = findRecipe[0]._id;

    response = await chai.request(app).get(`/recipes/${id}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.not.be.empty;

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });

  it('Será validado que é possível listar todas as receitas estando autenticado', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('users').insertOne({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
      role: 'user',
    });

    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'erickjacquin@gmail.com', password: '12345678' })
      .then((response) => response.body.token);

    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: '867tdc78ds876dvd78vdv',
    });

    const findRecipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .find()
      .toArray();

    const id = findRecipe[0]._id;

    response = await chai
      .request(app)
      .get(`/recipes/${id}`)
      .set('authorization', token);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.not.be.empty;

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });

  it('Será validado que não é possível listar uma receita que não existe', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: '867tdc78ds876dvd78vdv',
    });

    const findRecipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .find()
      .toArray();

    const id = findRecipe[0]._id.toString();
    const chnageId = id.replace('1', 'I');

    response = await chai.request(app).get(`/recipes/${chnageId}`);

    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('recipe not found');

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });
});

describe('PUT /recipes/id', () => {
  it('Será validado que não é possível editar receita sem estar autenticado', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    // Cadastro de Recipe
    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: '867tdc78ds876dvd78vdv',
    });

    const recipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .findOne({ name: 'Frango' });

    // Request
    response = await chai.request(app).put(`/recipes/${recipe._id}`);

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('missing auth token');

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });

  it('Será validado que não é possível editar receita com token inválido', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    // Cadastro de Recipe
    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: '867tdc78ds876dvd78vdv',
    });

    const recipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .findOne({ name: 'Frango' });

    // Request
    response = await chai
      .request(app)
      .put(`/recipes/${recipe._id}`)
      .set('authorization', '9999999999');

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('jwt malformed');

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });

  it('Será validado que é possível editar receita estando autenticado', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    // Cadastro de User
    await connectionMock.db('Cookmaster').collection('users').insertOne({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
      role: 'user',
    });

    const user = await connectionMock
      .db('Cookmaster')
      .collection('users')
      .findOne({ email: 'erickjacquin@gmail.com' });

    // Cadastro de Recipe
    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: user._id,
    });

    const recipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .findOne({ name: 'Frango' });

    // Login
    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'erickjacquin@gmail.com', password: '12345678' })
      .then((response) => response.body.token);

    // Request
    response = await chai
      .request(app)
      .put(`/recipes/${recipe._id}`)
      .set('authorization', token)
      .send({
        name: 'Frango Simples',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos de forno',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.not.be.empty;
    expect(response.body.name).to.be.equal('Frango Simples');

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });

  it('Será validado que é possível editar receita com usuário admin', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    // Cadastro de Users
    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .insertMany([
        {
          name: 'Erick Jacquin',
          email: 'erickjacquin@gmail.com',
          password: '12345678',
          role: 'user',
        },
        {
          name: 'admin',
          email: 'root@email.com',
          password: 'admin',
          role: 'admin',
        },
      ]);

    const user = await connectionMock
      .db('Cookmaster')
      .collection('users')
      .findOne({ email: 'erickjacquin@gmail.com' });

    // Cadastro de Recipe
    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: user._id,
    });

    const recipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .findOne({ name: 'Frango' });

    // Login
    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'root@email.com', password: 'admin' })
      .then((response) => response.body.token);

    // Request
    response = await chai
      .request(app)
      .put(`/recipes/${recipe._id}`)
      .set('authorization', token)
      .send({
        name: 'Frango Simples',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos de forno',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.not.be.empty;
    expect(response.body.name).to.be.equal('Frango Simples');

    MongoClient.connect.restore();

    await connectionMock.db('Cookmaster').collection('users').deleteMany();

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });

  it('Será validado que não é possível editar receita com usuário não permitido', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    // Cadastro de User
    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .insertMany([
        {
          name: 'Erick Jacquin',
          email: 'erickjacquin@gmail.com',
          password: '12345678',
          role: 'user',
        },
        {
          name: 'Trybe',
          email: 'trybe@email.com',
          password: 'trybe123',
          role: 'user',
        },
      ]);

    const user = await connectionMock
      .db('Cookmaster')
      .collection('users')
      .findOne({ email: 'erickjacquin@gmail.com' });

    // Cadastro de Recipe
    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: user._id,
    });

    const recipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .findOne({ name: 'Frango' });

    // Login
    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'trybe@email.com', password: 'trybe123' })
      .then((response) => response.body.token);

    // Request
    response = await chai
      .request(app)
      .put(`/recipes/${recipe._id}`)
      .set('authorization', token)
      .send({
        name: 'Frango Simples',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos de forno',
      });

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('unauthorized user');

    MongoClient.connect.restore();

    await connectionMock.db('Cookmaster').collection('users').deleteMany();

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });
});

describe('DELETE /recipes/id', () => {
  it('Será validado que não é possível excluir receita sem estar autenticado', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: '867tdc78ds876dvd78vdv',
    });

    const recipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .findOne({ name: 'Frango' });

    response = await chai.request(app).delete(`/recipes/${recipe._id}`);

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.a.property('message');
    expect(response.body.message).to.be.equal('missing auth token');

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });

  it('Será validado que é possível excluir receita estando autenticado', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    // Cadastro de User
    await connectionMock.db('Cookmaster').collection('users').insertOne({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
      role: 'user',
    });

    const user = await connectionMock
      .db('Cookmaster')
      .collection('users')
      .findOne({ email: 'erickjacquin@gmail.com' });

    // Cadastro de Recipe
    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: user._id,
    });

    const recipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .findOne({ name: 'Frango' });

    // Login
    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'erickjacquin@gmail.com', password: '12345678' })
      .then((response) => response.body.token);

    // Request
    response = await chai
      .request(app)
      .delete(`/recipes/${recipe._id}`)
      .set('authorization', token);

    expect(response).to.have.status(204);
    expect(response.body).to.be.empty;

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });
  });

  it('Será validado que é possível excluir receita com usuário admin', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    // Cadastro de Users
    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .insertMany([
        {
          name: 'Erick Jacquin',
          email: 'erickjacquin@gmail.com',
          password: '12345678',
          role: 'user',
        },
        {
          name: 'admin',
          email: 'root@email.com',
          password: 'admin',
          role: 'admin',
        },
      ]);

    const user = await connectionMock
      .db('Cookmaster')
      .collection('users')
      .findOne({ email: 'erickjacquin@gmail.com' });

    // Cadastro de Recipe
    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: user._id,
    });

    const recipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .findOne({ name: 'Frango' });

    // Login
    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'root@email.com', password: 'admin' })
      .then((response) => response.body.token);

    // Request
    response = await chai
      .request(app)
      .delete(`/recipes/${recipe._id}`)
      .set('authorization', token);

    expect(response).to.have.status(204);
    expect(response.body).to.be.empty;

    MongoClient.connect.restore();

    await connectionMock.db('Cookmaster').collection('users').deleteMany();
  });

  it('Será validado que não é possível excluir receita com usuário não permitido', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    // Cadastro de User
    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .insertMany([
        {
          name: 'Erick Jacquin',
          email: 'erickjacquin@gmail.com',
          password: '12345678',
          role: 'user',
        },
        {
          name: 'Trybe',
          email: 'trybe@email.com',
          password: 'trybe123',
          role: 'user',
        },
      ]);

    const user = await connectionMock
      .db('Cookmaster')
      .collection('users')
      .findOne({ email: 'erickjacquin@gmail.com' });

    // Cadastro de Recipe
    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: user._id,
    });

    const recipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .findOne({ name: 'Frango' });

    // Login
    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'trybe@email.com', password: 'trybe123' })
      .then((response) => response.body.token);

    // Request
    response = await chai
      .request(app)
      .delete(`/recipes/${recipe._id}`)
      .set('authorization', token);

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('unauthorized user');

    MongoClient.connect.restore();

    await connectionMock.db('Cookmaster').collection('users').deleteMany();

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });
});

// Como mockar arquivo de upload
// https://newbedev.com/how-to-unit-test-with-a-file-upload-in-mocha
describe('PUT /recipes/id/image/', () => {
  it('Será validado que é possível enviar foto com usuário autenticado', async () => {
    let connectionMock;
    let response;

    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    // Cadastro de User
    await connectionMock.db('Cookmaster').collection('users').insertOne({
      name: 'Erick Jacquin',
      email: 'erickjacquin@gmail.com',
      password: '12345678',
      role: 'user',
    });

    const user = await connectionMock
      .db('Cookmaster')
      .collection('users')
      .findOne({ email: 'erickjacquin@gmail.com' });

    // Cadastro de Recipe
    await connectionMock.db('Cookmaster').collection('recipes').insertOne({
      name: 'Frango',
      ingredients: 'Frango, sazon',
      preparation: '10 minutos de forno',
      userId: user._id,
    });

    const recipe = await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .findOne({ name: 'Frango' });

    // Login
    const token = await chai
      .request(app)
      .post('/login')
      .send({ email: 'erickjacquin@gmail.com', password: '12345678' })
      .then((response) => response.body.token);

    // Request
    response = await chai
      .request(app)
      .put(`/recipes/${recipe._id}/image`)
      .set('authorization', token)
      .field('Content-Type', 'multipart/form-data')
      .attach('image', path.join(__dirname, '..', 'uploads/ratinho.jpg'));

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.not.be.empty;
    expect(response.body.name).to.be.equal('Frango');

    MongoClient.connect.restore();

    await connectionMock
      .db('Cookmaster')
      .collection('users')
      .deleteOne({ email: 'erickjacquin@gmail.com' });

    await connectionMock
      .db('Cookmaster')
      .collection('recipes')
      .deleteOne({ name: 'Frango' });
  });
});
