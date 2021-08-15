const { MongoClient } = require('mongodb');

const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const server = require('../api/app');

const getConnection = require('./mockedConnection');

describe('POST /users create new user', () => {
    describe('When name, email and password are not informed', () => {
        let response;

        before(async () => {
            response = await chai.request(server)
                .post('/users')
                .send({})
        });

        it('Returns HTTP status 400', () => {
            expect(response).to.have.status(400)
        });

        it('Returns a object on body', () => {
            expect(response.body).to.be.an('object')
        })

        it('On body response there is a key message', () => {
            expect(response.body).to.have.a.property('message')
        })

        it('The key message on body has the right message of error', () => {
            expect(response.body.message).to.be.equal('Invalid entries. Try again.')

        })
    })

    describe('When name, email and password are informed on body request', () => {
        let response;
        let connectionMock;

        before(async () => {
            connectionMock = await getConnection()
            sinon.stub(MongoClient, 'connect').resolves(connectionMock);

            response = await chai.request(server)
                .post('/users')
                .send({
                    name: 'Daniel',
                    email: 'daniel@test.com',
                    password: 'test1234'
                })
        });

        after(() => {
            MongoClient.connect.restore();
        })

        it('Returns HTTP status 201', () => {
            expect(response).to.have.status(201)
        });

        it('Returns a object on body', () => {
            expect(response.body).to.be.an('object')
        })

        it('On body response there is not the key password', () => {
            expect(response.body.user).to.have.not.a.property('password')
        })
        it('On body response there is the key name', () => {
            expect(response.body.user).to.have.a.property('name')
        })
        it('On body response there is the key _id', () => {
            expect(response.body.user).to.have.a.property('_id')
        })
        it('On body response there is the key email', () => {
            expect(response.body.user).to.have.a.property('email')
        })
        it('On body response there is the key role', () => {
            expect(response.body.user).to.have.a.property('role')
        })
    })

    describe('When email is already registered', () => {
        let response;
        let connectionMock;

        before(async () => {
            connectionMock = await getConnection()
            sinon.stub(MongoClient, 'connect').resolves(connectionMock);

            await chai.request(server)
                .post('/users')
                .send({
                    name: 'Daniel',
                    email: 'daniel@test.com',
                    password: 'test1234'
                })

            response = await chai.request(server)
                .post('/users')
                .send({
                    name: 'Daniel',
                    email: 'daniel@test.com',
                    password: 'test1234'
                })
        });

        after(() => {
            MongoClient.connect.restore();
        })

        it('Returns HTTP status 409', () => {
            expect(response).to.have.status(409)
        });
        it('Returns a object on body', () => {
            expect(response.body).to.be.an('object')
        })

        it('On body response there is a key message', () => {
            expect(response.body).to.have.a.property('message')
        })

        it('The key message on body has the right message of error', () => {
            expect(response.body.message).to.be.equal('Email already registered')

        })
    })

    describe('When try to create a new admin user', () => {

        describe('without token', () => {
            let response;
            let connectionMock;

            before(async () => {
                connectionMock = await getConnection()
                sinon.stub(MongoClient, 'connect').resolves(connectionMock);

                response = await chai.request(server)
                    .post('/users/admin')
            });

            after(() => {
                MongoClient.connect.restore();
            })

            it('Return HTTP status 401', () => {
                expect(response).to.have.status(401)
            });
            it('Returns a object on body', () => {
                expect(response.body).to.be.an('object')
            })
            it('On body response there is a key message', () => {
                expect(response.body).to.have.a.property('message')
            })

            it('The key message on body has the right message of error', () => {
                expect(response.body.message).to.be.equal('missing auth token')

            })
        })

        describe('With a user token', () => {
            let response;
            let connectionMock;
            let token;

            before(async () => {
                connectionMock = await getConnection()
                sinon.stub(MongoClient, 'connect').resolves(connectionMock);

                await chai.request(server)
                    .post('/users')
                    .send({
                        name: 'Daniel',
                        email: 'daniel@test.com',
                        password: 'test1234'
                    })

                await chai.request(server)
                    .post('/login')
                    .send({
                        email: 'daniel@test.com',
                        password: 'test1234'
                    }).then((response) => {
                        token = response.body.token
                    })

                response = await chai.request(server)
                    .post('/users/admin')
                    .set('authorization', token)
            });

            after(() => {
                MongoClient.connect.restore();
            })
            it('Return HTTP status 403', () => {
                expect(response).to.have.status(403)
            });
            it('Returns a object on body', () => {
                expect(response.body).to.be.an('object')
            })
            it('On body response there is a key message', () => {
                expect(response.body).to.have.a.property('message')
            })

            it('The key message on body has the right message of error', () => {
                expect(response.body.message).to.be.equal('Only admins can register new admins')

            })
        })
    })

});

describe('POST /login', () => {
    describe('Login user without body request', () => {
        let response;
        let connectionMock;

        before(async () => {
            connectionMock = await getConnection()
            sinon.stub(MongoClient, 'connect').resolves(connectionMock);

            response = await chai.request(server)
                .post('/login')
                .send({})
        })

        after(() => {
            MongoClient.connect.restore();
        })

        it('Returns a HTTP status 401', () => {
            expect(response).to.have.status(401)
        })
        it('Returns a object on body', () => {
            expect(response.body).to.be.an('object')
        })
        it('On body response there is a key message', () => {
            expect(response.body).to.have.a.property('message')
        })

        it('The key message on body has the right message of error', () => {
            expect(response.body.message).to.be.equal('All fields must be filled')

        })
    })

    describe('Login user with with wrong properties', () => {
        let response;
        let connectionMock;

        before(async () => {
            connectionMock = await getConnection()
            sinon.stub(MongoClient, 'connect').resolves(connectionMock);

            response = await chai.request(server)
                .post('/login')
                .send({
                    email: 'daniel@testando.com',
                    password: 'test12345'
                })
        })

        after(() => {
            MongoClient.connect.restore();
        })
        
        it('Returns a HTTP status 401', () => {
            expect(response).to.have.status(401)
        })
        it('Returns a object on body', () => {
            expect(response.body).to.be.an('object')
        })
        it('On body response there is a key message', () => {
            expect(response.body).to.have.a.property('message')
        })

        it('The key message on body has the right message of error', () => {
            expect(response.body.message).to.be.equal('Incorrect username or password')
        })
    })

    describe('Login user', () => {
        let response;
        let connectionMock;

        before(async () => {
            connectionMock = await getConnection()
            sinon.stub(MongoClient, 'connect').resolves(connectionMock);

            response = await chai.request(server)
                .post('/login')
                .send({
                    email: 'daniel@test.com',
                    password: 'test1234'
                })
        })

        after(() => {
            MongoClient.connect.restore();
        })
        
        it('Returns a HTTP status 200', () => {
            expect(response).to.have.status(200)
        })
        it('Returns a object on body', () => {
            expect(response.body).to.be.an('object')
        })
        it('On body response there is a key token', () => {
            expect(response.body).to.have.a.property('token')
        })
    })
})
