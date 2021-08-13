const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../api/app');

const { MongoClient } = require('mongodb');

const { createDB, destroyDB } = require('./mongoMock')

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('Será validado que o campo "name" é obrigatório', () => {
    let response;

    before(async () => {
      const user = {email: 'erickjaquin@gmail.com',password: '12345678'}
      response = await chai.request(app)
        .post('/users')
        .send(user)
    })
    it('Retorna status 400', () => {
      expect(response).to.have.status(400)
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.a('object')
    });

    it('Objeto de resposta tem uma propriedade chamada "message"', () => {
      expect(response.body).to.have.property('message')
    });

    it('A propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.')
    });
  })

  describe('Será validado que o campo "email" é obrigatório', () => {
    let response;

    before(async () => {
      const user = {name: 'nome',password: '12345678'}
      response = await chai.request(app)
        .post('/users')
        .send(user)
    })
    it('Retorna status 400', () => {
      expect(response).to.have.status(400)
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.a('object')
    });

    it('Objeto de resposta tem uma propriedade chamada "message"', () => {
      expect(response.body).to.have.property('message')
    });

    it('A propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.')
    });
  })

  describe('Será validado que não é possível cadastrar usuário com o campo email inválido', () => {
    let response;

    before(async () => {
      const user = {name: 'nome',password: '12345678', email: 'teste@'}
      response = await chai.request(app)
        .post('/users')
        .send(user)
    })
    it('Retorna status 400', () => {
      expect(response).to.have.status(400)
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.a('object')
    });

    it('Objeto de resposta tem uma propriedade chamada "message"', () => {
      expect(response.body).to.have.property('message')
    });

    it('A propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.')
    });
  })

  describe('Será validado que o campo "senha" é obrigatório', () => {
    let response;
    let fakeDB;

    before(async () => {
      const newUser = {name: 'nome', email: 'teste@teste.com'}
      fakeDB = await createDB()
      sinon.stub(MongoClient, 'connect').resolves(fakeDB);
      response = await chai.request(app).post('/users').send(newUser).then((res) => res);
    })

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Retorna status 400', () => {
      expect(response).to.have.status(400)
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.a('object')
    });

    it('Objeto de resposta tem uma propriedade chamada "message"', () => {
      expect(response.body).to.have.property('message')
    });

    it('A propriedade "message" possui uma mensagem de erro adequada', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.')
    });
  })

  describe('Será validado que é possível cadastrar usuário com sucesso', () => {
    let response;
    let fakeDB;

    before(async () => {
      const newUser = {name: 'nome', email: 'teste@teste.com', password: '123456'}
      fakeDB = await createDB()
      sinon.stub(MongoClient, 'connect').resolves(fakeDB);
      response = await chai.request(app).post('/users').send(newUser).then((res) => res);
    })

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Retorna status 201', () => {
      expect(response).to.have.status(201)
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.a('object')
    });

    it('Objeto de resposta tem uma propriedade chamada "user"', () => {
      expect(response.body).to.have.property('user')
    });

    it('A propriedade "user" possui todos os campos necessarios', () => {
      expect(response.body.user).to.have.property('name')
      expect(response.body.user).to.have.property('email')
      expect(response.body.user).to.have.property('role')
      expect(response.body.user).to.have.property('_id')
    });
  })

  describe('Será validado que o campo "email" é único', () => {
    let response;
    let fakeDB;

    before(async () => {
      const newUser = {name: 'nome', email: 'teste@teste.com', password: '123456'}
      fakeDB = await createDB()
      sinon.stub(MongoClient, 'connect').resolves(fakeDB);
      chai.request(app).post('/users').send(newUser)
      response = await chai.request(app).post('/users').send(newUser).then((res) => res);
    })

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Retorna status 409', () => {
      expect(response).to.have.status(409)
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.be.a('object')
    });

    it('Objeto de resposta tem uma propriedade chamada "user"', () => {
      expect(response.body).to.have.property('message')
    });

    it('Objeto de resposta tem uma mensagem especifica', () => {
      expect(response.body.message).to.be.equal('Email already registered')
    });
  })
})