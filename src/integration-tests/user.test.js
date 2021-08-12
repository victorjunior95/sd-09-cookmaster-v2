const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect, request } = require("chai");

const server = require('../api/app');

const getConnection = require('./mongoMock');

chai.use(chaiHttp);

const app = require('../api/app');


describe('Cadastro de usuario', () => {
  it('Nome não preenchido', (done) => {
    const newUser = { email: 'erickjaquin@gmail.com',password: '12345678' };
    chai.request(app).post('/users').send(newUser).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      console.log(res.body.message);
      expect(res.body.message).to.be.equal('Invalid entries. Try again.');
      done();
    });
  });

  it('Email não preenchido', (done) => {
    const newUser = { name: 'Erick Jaquin',password: '12345678' };
    chai.request(app).post('/users').send(newUser).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      console.log(res.body.message);
      expect(res.body.message).to.be.equal('Invalid entries. Try again.');
      done();
    });
  });

  it('Email invalido', (done) => {
    const newUser = { name: 'Erick Jaquin',password: '12345678', email: 'erickjaquin@' };
    chai.request(app).post('/users').send(newUser).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      console.log(res.body.message);
      expect(res.body.message).to.be.equal('Invalid entries. Try again.');
      done();
    });
  });

  it('Senha não preenchida', (done) => {
    const newUser = { name: 'Erick Jaquin', email: 'erickjaquin@' };
    chai.request(app).post('/users').send(newUser).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      console.log(res.body.message);
      expect(res.body.message).to.be.equal('Invalid entries. Try again.');
      done();
    });
  });
});

describe('Login', async () => {
  it('Será validado que o campo "email" é obrigatório', (done) => {
    const newUser = { password: '12345678' };
    chai.request(app).post('/login').send(newUser).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(401);
      console.log(res.body.message);
      expect(res.body.message).to.be.equal('All fields must be filled');
      done();
    });
  });

  it('Será validado que o campo "password" é obrigatório', (done) => {
    const newUser = { email: 'erickjaquin@teste.com' };
    chai.request(app).post('/login').send(newUser).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(401);
      console.log(res.body.message);
      expect(res.body.message).to.be.equal('All fields must be filled');
      done();
    });
  });

  // it('Será validado que não é possível fazer login com um email inválido', (done) => {
  //   const newUser = { email: 'erickjaquin@', password: '12345678' };
  //   chai.request(app).post('/login').send(newUser).end((err, res) => {
  //     expect(err).to.be.null;
  //     expect(res).to.have.status(401);
  //     console.log(res.body.message);
  //     expect(res.body.message).to.be.equal('All fields must be filled');
  //     done();
  //   });
  // });
});

describe('Cadastro de receitas', () => {
  it('Será validado que não é possível cadastrar uma receita com token invalido', (done) => {
    const newRecipe = { ingredients: 'Frango',preparation: '10 min no forno' };
    chai.request(app).post('/recipes').set('Authorization', '123').send(newRecipe).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(401);
      console.log(res.body.message);
      expect(res.body.message).to.be.equal('jwt malformed');
      done();
    });
  });
});