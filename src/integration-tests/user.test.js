const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../api/app')

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

    before((done) => {
      const user = {name: 'nome', email: 'teste@gmail.com'}
      response = chai.request(app).post('/users').send(user).then((res) => res)
      done();
    })

    it('Retorna status 400', () => {
      console.log(response)
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
})