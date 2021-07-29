const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('When user is registered', () => {
    let response;

    before (async () => {
      response = await chai.request(app).post('/users').send({
        name: 'Teste Foi',
        email: 'test_foi@test.com',
        password: '12345678',
      });
    })

    it('return HTPP 201', () => {
      expect(response).to.have.status(201);
    });

    it('return user object', () => {
      expect(response.body).to.be.an('object');
    });

    it('return user info', () => {
      expect(response.body).to.have.property('user');
    });

  });
});
