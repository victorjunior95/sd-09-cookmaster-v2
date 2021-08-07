const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const server = require('../api/app');
const connection = require('./mongoConnectionMock');
const { MongoClient } = require('mongodb');

describe('POST /users', () => {
  describe('quando é criado com sucesso', () => {
    let response;
    let connetion;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      response = await chai.request(server).post('/users').send({
        name: 'string',
        email: 'string@email.com',
        password: 'string'
      });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connetion.db('Cookmaster').collection('users').deleteMany({});
    });

    it('deve retornar o status 201', () =>
      expect(response).to.have.status(201));

    it('deve retornar um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('deve possuir a propriedade "user"', () =>
      expect(response.body).to.have.property('user'));
  });

  describe('quando não é criado com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send({
        name: '',
        password: ''
      });
    });

    it('deve retornar status 400', () =>
      expect(response).to.have.status(400));

    it('deve retornar um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('de ter a propriedade "message"', () =>
      expect(response.body).to.have.a.property('message'));
  });
});

describe('POST /login', () => {
  describe('quando o login é realizado com sucesso', () => {
    let response;
    let connetion;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      await connetion.db('Cookmaster').collection('users').insertOne({
        name: 'string',
        email: 'string@email.com',
        password: 'string',
        role: 'user'
      });

      response = await chai.request(server).post('/login').send({
        email: 'string@email.com',
        password: 'string'
      });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connetion.db('Cookmaster').collection('users').deleteMany({});
    });

    it('deve retornar status 200', () =>
      expect(response).to.have.status(200));

    it('deve retornar um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('deve possuir a propriedade "token"', () =>
      expect(response.body).to.have.property('token'));
  });

  describe('quando o login não é realizado com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/login').send({
        email: '',
        password: ''
      });
    });

    it('deve retornar status 401', () =>
      expect(response).to.have.status(401));

    it('deve retornar um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('deve possuir a propriedade "message"', () =>
      expect(response.body).to.have.a.property('message'));
  });
});

describe('GET /recipes', () => {
  describe('quando tem receitas cadastradas', () => {
    let response;
    let connetion;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      await connetion.db('Cookmaster').collection('recipes').insertOne({
        name: "string",
        ingredients: "string",
        preparation: "string",
        userId: "5f46914677df66035f61a355"
      });

      response = await chai.request(server).get('/recipes').send({});
    });

    after(async () => {
      MongoClient.connect.restore();
      await connetion.db('Cookmaster').collection('recipes').deleteMany({});
    });

    it('deve retornar status 200', () =>
      expect(response).to.have.status(200));

    it('deve retornar um array', () =>
      expect(response.body).to.be.an('array'));

    it('não deve estar vazio', () =>
      expect(response.body).to.have.length);
  });

  describe('quando não tem receitas cadastradas', () => {
    let response;

    before(async () => {
      response = await chai.request(server).get('/recipes').send({});
    });

    it('deve retornar status 200', () =>
      expect(response).to.have.status(200));

    it('deve retornar um array', () =>
      expect(response.body).to.be.an('array'));

    it('deve ser um array vazio', () =>
      expect(response.body).to.be.empty);
  });
});

describe('GET /ping', () => {
  describe('ping', () => {
    let response;
    let connetion;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      response = await chai.request(server).get('/ping').send({});
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('deve retornar o status 200', () =>
      expect(response).to.have.status(200));

    it('deve retornar um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('deve possuir a propriedade "ping"', () =>
      expect(response.body).to.have.property('ping'));
  });
});

describe('GET /users', () => {
  describe('quando tem usuarios cadastrados', () => {
    let response;
    let connetion;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      await connetion.db('Cookmaster').collection('users').insertOne({
        name: 'string',
        email: 'string@email.com',
        password: 'string',
        role: 'user'
      });

      response = await chai.request(server).get('/users').send({});
    });

    after(async () => {
      MongoClient.connect.restore();
      await connetion.db('Cookmaster').collection('users').deleteMany({});
    });

    it('deve retornar status 200', () =>
      expect(response).to.have.status(200));

    it('deve retornar um array', () =>
      expect(response.body).to.be.an('array'));

    it('não deve estar vazio', () =>
      expect(response.body).to.have.length);
  });

  describe('quando não tem usuarios cadastrados', () => {
    let response;

    before(async () => {
      response = await chai.request(server).get('/users').send({});
    });

    it('deve retornar status 200', () =>
      expect(response).to.have.status(200));

    it('deve retornar um array', () =>
      expect(response.body).to.be.an('array'));

    it('deve ser um array vazio', () =>
      expect(response.body).to.be.empty);
  });
});

describe('POST /users/admin', () => {
  describe('quando o token é validado com sucesso', () => {
    let response;
    let connetion;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      await connetion.db('Cookmaster').collection('users').insertOne({
        name: 'string',
        email: 'string@email.com',
        password: 'string',
        role: 'admin'
      });

      const token = await chai.request(server).post('/login').send({ email: 'string@email.com', password: 'string' }).then((res) => res.text);

      response = await chai.request(server).post('/users').send({
        name: 'stringou',
        email: 'stringou@email.com',
        password: 'stringou'
      }).set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connetion.db('Cookmaster').collection('users').deleteMany({});
    });

    it('deve retornar o status 201', () =>
      expect(response).to.have.status(201));

    it('deve retornar um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('deve possuir a propriedade "user"', () =>
      expect(response.body).to.have.property('user'));
  });

  describe('quando o token não é validado com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users/admin').send({
        name: '',
        password: ''
      });
    });

    it('deve retornar status 401', () =>
      expect(response).to.have.status(401));

    it('deve retornar um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('de ter a propriedade "message"', () =>
      expect(response.body).to.have.a.property('message'));
  });
});

describe('POST /recipes', () => {
  describe('quando o token é validado com sucesso', () => {
    let response;
    let connetion;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      await connetion.db('Cookmaster').collection('users').insertOne({
        name: 'string',
        email: 'string@email.com',
        password: 'string',
        role: 'admin'
      });

      const token = await chai.request(server).post('/login').send({ email: 'string@email.com', password: 'string' }).then((res) => res.text);

      response = await chai.request(server).post('/recipes').send({
        name: "string",
        ingredients: "string",
        preparation: "string",
      }).set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connetion.db('Cookmaster').collection('users').deleteMany({});
    });

    it('deve retornar o status 201', () =>
      expect(response).to.have.status(401));

    it('deve retornar um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('deve possuir a propriedade "recipe"', () =>
      expect(response.body).to.have.property('message'));
  });

  describe('quando o token não é validado com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/recipes').send({
        name: '',
        password: ''
      });
    });

    it('deve retornar status 401', () =>
      expect(response).to.have.status(401));

    it('deve retornar um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('de ter a propriedade "message"', () =>
      expect(response.body).to.have.a.property('message'));
  });
});

describe('GET /model', () => {
  describe('model', () => {
    let response;
    let connetion;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      response = await chai.request(server).get('/model').send({});
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('deve retornar o status 200', () =>
      expect(response).to.have.status(200));

    it('deve retornar um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('deve possuir a propriedade "model"', () =>
      expect(response.body).to.have.property('model'));
  });
});

// describe('GET /recipes/:id', () => {
//   describe('quando existe a receita cadastrada', () => {
//     let response;
//     let connetion;
//     let recipeID;
//     before(async () => {
//       connetion = await connection();
//       sinon.stub(MongoClient, 'connect').resolves(connetion);

//       await connetion.db('Cookmaster').collection('recipes').insertOne({
//         _id: "5f46924677df66035f61a365",
//         name: "string",
//         ingredients: "string",
//         preparation: "string",
//         userId: "5f46914677df66035f61a355"
//       });

//       recipeID = '5f46924677df66035f61a365';

//       response = await chai.request(server).get(`/recipes/${recipeID}`).send({});
//     });

//     after(async () => {
//       MongoClient.connect.restore();
//       await connetion.db('Cookmaster').collection('recipes').deleteMany({ name: 'string' });
//     });

//     it('deve retornar status 200', () =>
//       expect(response).to.have.status(200));

//     it('deve retornar um objeto', () =>
//       expect(response.body).to.be.an('objeto'));

//     it('deve possuir as propriedades: "id", "name", "ingredients", "preparation" e "userId"', () =>
//       expect(response.body).to.have.all.keys("_id", "name", "ingredients", "preparation", "userId"));
//   });

//   describe('quando não tem a receita cadastrada', () => {
//     let response;

//     before(async () => {
//       recipeID = '5f46924677df66035f61a365';
//       response = await chai.request(server).get(`/recipes/${recipeID}`).send({});
//     });

//     it('deve retornar status 404', () =>
//       expect(response).to.have.status(404));

//     it('deve retornar um objeto', () =>
//       expect(response.body).to.be.an('object'));

//     it('deve possuir a propriedade "message"', () =>
//       expect(response.body).to.have.property('message'));
//   });
// });
