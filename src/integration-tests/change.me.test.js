const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../api/app');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { expect } = require("chai");
const Sinon = require("sinon");
chai.use(chaiHttp);

describe('Post /users', () => {
    /**
     * @type {ChaiHttp.Agent}
     */
    let request;
    /**
     * @type {MongoMemoryServer}
     */
    let DBServer;
    before(async () => {
        request = chai.request(app);
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
    it('should create a user', async () => {
        const response = await request.post(`/users`).send({
            name: 'joao',
            email: 'testando@abc.com',
            password: '123',
        });
        expect(response.status).to.be.eq(201);
    });
});
