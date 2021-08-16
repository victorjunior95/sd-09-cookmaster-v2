const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

const sinon = require('sinon');
const app = require('../api/app');
const { MongoClient, ObjectID } = require('mongodb');
const connection = require('./connection');

describe('Registering a recipe', () => {
  describe('when it is created successfully', () => {
    let response;
    let conn;
    let login;
    const user = { name: 'fakeName', email: 'fake@email.com', password: '123'};

    before(async () => {
      conn = await connection();
      sinon.stub(MongoClient, 'connect').resolves(conn);
      await conn.db('Cookmaster').collection('users').insertOne(user);

      login = await chai.request(app)
        .post('/login')
        .send({ email: user.email, password: user.password });

      response = await chai.request(app)
        .post('/recipes')
        .send({
          name: "fakeRecipe",
          ingredients: "fakeIngredients",
          preparation: "fakePreparation"
        })
        .set('authorization', login.body.token);
    });

    after(async () => {
      MongoClient.connect.restore();
      await conn.db('Cookmaster').collection('recipes').deleteOne({ name: 'fakeRecipe' });
    });

    it('Return the status code 201', () => {
      expect(response). to .have.status(201);
    });

    it('Return a object with the property "recipe"', () => {
      expect(response.body).to.have.property('recipe');
      expect(response.body.recipe).to.be.an('object');
    });
  });

  describe('when it is not created successfully', () => {
    describe('when a token is inValid', () => {
      let response;
      let conn;

      before(async () => {
        response = await chai.request(app)
          .post('/recipes')
          .send({
            name: "fakeRecipe",
            ingredients: "fakeIngredients",
            preparation: "fakePreparation"
          })
          .set('authorization', '999');
      });

      it('Return the status code 401', () => {
        expect(response).to.have.status(401);
      }); 

      it('Return the message "jwt malformed"', () => {
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('jwt malformed');
      });
    });

    describe('when a token is missing', () => {
      let response;
      let conn;

      before(async () => {
        response = await chai.request(app)
          .post('/recipes')
          .send({
            name: "fakeRecipe",
            ingredients: "fakeIngredients",
            preparation: "fakePreparation"
          });
      });

      it('Return the status code 401', () => {
        expect(response).to.have.status(401);
      }); 

      it('Return the message "missing auth token"', () => {
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('missing auth token');
      });
    });

    describe('when the request not have a body', () => {
      let response;
      let conn;
      let login;
      const user = { name: 'fakeName', email: 'fake@email.com', password: '123'};

      before(async () => {
        conn = await connection();
        sinon.stub(MongoClient, 'connect').resolves(conn);
        await conn.db('Cookmaster').collection('users').insertOne(user);

        login = await chai.request(app)
          .post('/login')
          .send({ email: user.email, password: user.password });

        response = await chai.request(app)
          .post('/recipes')
          .send({})
          .set('authorization', login.body.token);
      });

      after(async () => {
        MongoClient.connect.restore();
        await conn.db('Cookmaster').collection('recipes').deleteOne({ name: 'fakeRecipe' });
      });

      it('Return the status code 400', () => {
        expect(response).to.have.status(400);
      });

      it('Return the message "Invalid entries. Try again."', () => {
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });
  });
});

describe('Listing all recipes', () => {
  let response;
  let conn;
  const recipes = [
    {
       _id: '5f46a9c177df66035f61a36e',
       name: 'fakeRecipe01',
       ingredients: 'fakeIngredients01',
       preparation: 'fakePreparation01',
       userID: '5f46a9c177df66035f61a36d'
    },
    {
      _id: '5f46a9c177df66035f61a37e',
      name: 'fakeRecipe02',
      ingredients: 'fakeIngredients02',
      preparation: 'fakePreparation02',
      userID: '5f46a9c177df66035f61a37d'
   }
  ];

  before(async () => {
    conn = await connection();
    sinon.stub(MongoClient, 'connect').resolves(conn);
    await conn.db('Cookmaster').collection('recipes').insertMany(recipes);

    response = await chai.request(app)
      .get('/recipes');
  });

  after(async () => {
    MongoClient.connect.restore();
    await conn.db('Cookmaster').collection('recipes').deleteMany();
  });

  it('Return the status code 200', () => {
    expect(response).to.have.status(200);
  });

  it('Return an array', () => {
    expect(response.body).to.be.an('array');
  });
});
