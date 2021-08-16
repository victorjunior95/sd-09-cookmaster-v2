const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../api/app');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { expect } = require("chai");
const Sinon = require("sinon");
const { getConnection } = require("../models");
chai.use(chaiHttp);

function request() {
    return chai.request(app);
}

 /**
  * @type {MongoMemoryServer}
  */
 let DBServer;
 before(async () => {
     DBServer = new MongoMemoryServer();

     const URLMock = await DBServer.getUri();
     const connectionMock = await MongoClient.connect(URLMock,
         { useNewUrlParser: true, useUnifiedTopology: true }
     );

     Sinon.stub(MongoClient, 'connect')
         .resolves(connectionMock);
 });

 after(async () => {
     MongoClient.connect.restore();
     await DBServer.stop();
 });

 afterEach(async () => {
    const userCollection = await getConnection('users');
    const recipeCollection = await getConnection('recipes');
    await userCollection.deleteMany({});
    await recipeCollection.deleteMany({});
 });

describe('Post /users', () => {
    it('should create a user', async () => {
        const response = await request().post(`/users`).send({
            name: 'joao',
            email: 'testando@abc.com',
            password: '123',
        });
        expect(response.status).to.be.eq(201);
    });
});

describe('Post /login', () => {
    it('should do login', async () => {
        const email = 'testando@abc2.com';
        const password = '123';
        await request().post('/users').send({
            name: 'joao',
            email: email,
            password: password,
        });
        const response = await request().post(`/login`).send({
            email: email,
            password: password,
        });
        expect(response.status).to.be.eq(200);
        expect(response.body).to.haveOwnProperty('token');
    });
});

describe('Post /recipes', () => {
    it('should create a recipe', async () => {
        const email = 'testando@abc2.com';
        const password = '123';
        await request().post('/users').send({
            name: 'joao',
            email: email,
            password: password,
        });
        const { body: { token } } = await request().post(`/login`).send({
            email: email,
            password: password,
        });
        let response = await request().post('/recipes').send({
            name: 'Receita teste',
            ingredients: 'A, b, c',
            preparation: 'Faz a primeiro depois b depois c',
        });
        expect(response.status).to.be.eq(401);

        response = await request().post('/recipes').set('authorization', token).send({
            name: 'Receita teste',
            ingredients: 'A, b, c',
            preparation: 'Faz a primeiro depois b depois c',
        });
        expect(response.status).to.be.eq(201);
    });
});
