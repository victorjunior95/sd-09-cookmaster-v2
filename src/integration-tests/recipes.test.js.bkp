const { MongoClient } = require("mongodb");
const server = require("../api/server");
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const fs = require("fs");

const getConnection = require("./connectionMock");

const { USER_LOGIN, CREATE_USER, RECIPE, MANY_RECIPES } = require("./dataMock");

describe("POST /Recipes", () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe("1-) Verifica que não é possível postar uma receita sem estar autenticado", () => {
    let response;

    before(async () => {
      response = await chai.request(server).post("/recipes").send(RECIPE);
    });

    it("Retorna código de erro 401", () => {
      expect(response).to.have.status(401);
    });
    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });
    it("Retorna uma propriedade com nome de 'message'", () => {
      expect(response.body).to.be.property("message");
    });
    it("Retorna a mensagem de erro dentro da propriedade 'message'", () => {
      expect(response.body.message).to.be.equals("missing auth token");
    });
  });

  describe("2-) Verifica se é possível cadastrar uma receita com sucesso", () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock
        .db("Cookmaster")
        .collection("users");
      await usersCollection.deleteMany();
      await usersCollection.insertOne(CREATE_USER);

      response = await chai.request(server).post("/login").send(USER_LOGIN);

      const recipesCollection = connectionMock
        .db("Cookmaster")
        .collection("recipes");
      await recipesCollection.deleteMany();

      const token = await chai
        .request(server)
        .post("/login")
        .send(USER_LOGIN)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .post("/recipes")
        .set("authorization", token)
        .send(RECIPE);
    });

    it("Retorna com código de sucesso '201'", () => {
      expect(response).to.have.status(201);
    });
    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });
    it("Retorna um objeto com a propriedade 'recipe'", () => {
      expect(response.body).to.have.property("recipe");
    });
    it("Retorna um objeto com a propriedade 'name'", () => {
      expect(response.body.recipe).to.have.property("name");
    });
    it("Retorna um objeto com a propriedade 'ingredients'", () => {
      expect(response.body.recipe).to.have.property("ingredients");
    });
    it("Retorna um objeto com a propriedade 'preparation'", () => {
      expect(response.body.recipe).to.have.property("preparation");
    });
    it("Retorna um objeto com a propriedade '_id'", () => {
      expect(response.body.recipe).to.have.property("_id");
    });
  });

  describe("3-) Verifica que não é possível cadastrar uma receita com dados inválidos", () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock
        .db("Cookmaster")
        .collection("users");
      await usersCollection.deleteMany();
      await usersCollection.insertOne(CREATE_USER);

      response = await chai.request(server).post("/login").send(USER_LOGIN);

      const recipesCollection = connectionMock
        .db("Cookmaster")
        .collection("recipes");
      await recipesCollection.deleteMany();

      const token = await chai
        .request(server)
        .post("/login")
        .send(USER_LOGIN)
        .then((response) => response.body.token);

      response = await chai
        .request(server)
        .post("/recipes")
        .set("authorization", token)
        .send({});
    });

    it("Retorna código de erro 400", () => {
      expect(response).to.have.status(400);
    });

    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });

    it("Retorna uma propriedade com nome de 'message'", () => {
      expect(response.body).to.have.property("message");
    });

    it("Retorna a mensagem de erro dentro da propriedade 'message'", () => {
      expect(response.body.message).to.be.equal("Invalid entries. Try again.");
    });
  });
});

////

describe("GET /Recipes", () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe("1-) Verifica que é possível pegar todas receitas sem estar autenticado", () => {
    let response;
    before(async () => {
      const recipesCollection = connectionMock
        .db("Cookmaster")
        .collection("recipes");
      await recipesCollection.deleteMany();
      await recipesCollection.insertMany(MANY_RECIPES);
      response = await chai.request(server).get("/recipes");
    });
    it("Retorna código de sucesso 200", () => {
      expect(response).to.have.status(200);
    });
    it("Retorna um array como resposta", () => {
      expect(response.body).to.be.an("array");
    });
  });
  describe("2-) Verifica que é possível pegar todas receitas estando autenticado", () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock
        .db("Cookmaster")
        .collection("users");
      await usersCollection.deleteMany();
      await usersCollection.insertOne(CREATE_USER);

      const recipesCollection = connectionMock
        .db("Cookmaster")
        .collection("recipes");
      await recipesCollection.deleteMany();
      await recipesCollection.insertMany(MANY_RECIPES);

      const token = await chai
        .request(server)
        .post("/login")
        .send(USER_LOGIN)
        .then((response) => response.body.token);
      response = await chai
        .request(server)
        .get("/recipes")
        .set("authorization", token);
    });
    it("Retorna código de erro 400", () => {
      expect(response).to.have.status(200);
    });
    it("Retorna um array como resposta", () => {
      expect(response.body).to.be.an("array");
    });
  });

  describe("Verifica que é possível pegar uma receita por id se estar autenticado", () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock
        .db("Cookmaster")
        .collection("users");
      await usersCollection.deleteMany();
      await usersCollection.insertOne(CREATE_USER);

      const recipesCollection = connectionMock
        .db("Cookmaster")
        .collection("recipes");
      await recipesCollection.deleteMany();

      const token = await chai
        .request(server)
        .post("/login")
        .send(USER_LOGIN)
        .then((response) => response.body.token);

      const recipeId = await chai
        .request(server)
        .post("/recipes")
        .set("authorization", token)
        .send(RECIPE)
        .then((response) => response.body.recipe._id);

      response = await chai.request(server).get(`/recipes/${recipeId}`);
    });

    it("Retorna com código de sucesso '200'", () => {
      expect(response).to.have.status(200);
    });

    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });

    it("Retorna um um objeto com a propriedade 'name'", () => {
      expect(response.body).to.have.property("name");
    });

    it("Retorna um um objeto com a propriedade 'ingredients'", () => {
      expect(response.body).to.have.property("ingredients");
    });

    it("Retorna um um objeto com a propriedade 'preparation'", () => {
      expect(response.body).to.have.property("preparation");
    });

    it("Retorna um um objeto com a propriedade 'userId'", () => {
      expect(response.body).to.have.property("userId");
    });

    it("Retorna um um objeto com a propriedade '_id'", () => {
      expect(response.body).to.have.property("_id");
    });
  });
  describe("4-) Verifica que é possível pegar uma receita por id autenticado", () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock
        .db("Cookmaster")
        .collection("users");
      await usersCollection.deleteMany();
      await usersCollection.insertOne(CREATE_USER);

      const recipesCollection = connectionMock
        .db("Cookmaster")
        .collection("recipes");
      await recipesCollection.deleteMany();

      const token = await chai
        .request(server)
        .post("/login")
        .send(USER_LOGIN)
        .then((response) => response.body.token);

      const recipeId = await chai
        .request(server)
        .post("/recipes")
        .set("authorization", token)
        .send(RECIPE)
        .then((response) => response.body.recipe._id);
      response = await chai.request(server).get(`/recipes/${recipeId}`);
    });
    it("Retorna com código de sucesso '200'", () => {
      expect(response).to.have.status(200);
    });
    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });
    it("Retorna um um objeto com a propriedade 'name'", () => {
      expect(response.body).to.have.property("name");
    });
    it("Retorna um um objeto com a propriedade 'ingredients'", () => {
      expect(response.body).to.have.property("ingredients");
    });
    it("Retorna um um objeto com a propriedade 'preparation'", () => {
      expect(response.body).to.have.property("preparation");
    });
    it("Retorna um um objeto com a propriedade 'userId'", () => {
      expect(response.body).to.have.property("userId");
    });
    it("Retorna um um objeto com a propriedade '_id'", () => {
      expect(response.body).to.have.property("_id");
    });
  });
});

describe("PUT / RECIPES", () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe("1 - Verifica se é possível editar uma receita com sucesso", () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock
        .db("Cookmaster")
        .collection("users");
      await usersCollection.deleteMany();
      await usersCollection.insertOne(CREATE_USER);

      const recipesCollection = connectionMock
        .db("Cookmaster")
        .collection("recipes");
      await recipesCollection.deleteMany();

      const token = await chai
        .request(server)
        .post("/login")
        .send(USER_LOGIN)
        .then((response) => response.body.token);

      const recipeId = await chai
        .request(server)
        .post("/recipes")
        .set("authorization", token)
        .send(RECIPE)
        .then((response) => response.body.recipe._id);

      response = await chai
        .request(server)
        .put(`/recipes/${recipeId}`)
        .set("authorization", token)
        .send(RECIPE);
    });

    it("Retorna com código de sucesso '200'", () => {
      expect(response).to.have.status(200);
    });

    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });

    it("Retorna um um objeto com a propriedade 'name'", () => {
      expect(response.body).to.have.property("name");
    });

    it("Retorna um um objeto com a propriedade 'ingredients'", () => {
      expect(response.body).to.have.property("ingredients");
    });

    it("Retorna um um objeto com a propriedade 'preparation'", () => {
      expect(response.body).to.have.property("preparation");
    });

    it("Retorna um um objeto com a propriedade 'userId'", () => {
      expect(response.body).to.have.property("userId");
    });

    it("Retorna um um objeto com a propriedade '_id'", () => {
      expect(response.body).to.have.property("_id");
    });
  });
});

describe("DELETE / RECIPES", () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe("1 - Testa que é possível deletar uma receita com sucesso", () => {
    let response;
    let result;

    before(async () => {
      const usersCollection = connectionMock
        .db("Cookmaster")
        .collection("users");
      await usersCollection.deleteMany();
      await usersCollection.insertOne(CREATE_USER);

      const recipesCollection = connectionMock
        .db("Cookmaster")
        .collection("recipes");
      await recipesCollection.deleteMany();

      const token = await chai
        .request(server)
        .post("/login")
        .send(USER_LOGIN)
        .then((response) => response.body.token);

      const id = await chai
        .request(server)
        .post("/recipes")
        .set("authorization", token)
        .send(RECIPE)
        .then((response) => response.body.recipe._id);

      response = await chai
        .request(server)
        .delete(`/recipes/${id}`)
        .set("authorization", token);

      result = await chai.request(server).get(`/recipes/${id}`);
    });

    it("Retorna código de erro '204'", () => {
      expect(response).to.have.status(204);
    });
  });
});

describe("POST/ IMAGEM", () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, "connect").resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe("Verifica se é possível adicionar uma imagem a receita", () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock
        .db("Cookmaster")
        .collection("users");
      await usersCollection.deleteMany();
      await usersCollection.insertOne(CREATE_USER);

      const recipesCollection = connectionMock
        .db("Cookmaster")
        .collection("recipes");
      await recipesCollection.deleteMany();

      const token = await chai
        .request(server)
        .post("/login")
        .send(USER_LOGIN)
        .then((response) => response.body.token);

      const recipeId = await chai
        .request(server)
        .post("/recipes")
        .set("authorization", token)
        .send(RECIPE)
        .then((response) => response.body.recipe._id);

      response = await chai
        .request(server)
        .put(`/recipes/${recipeId}/image`)
        .set("authorization", token)
        .attach(
          "image",
          fs.readFileSync("src/uploads/ratinho.jpg"),
          "ratinho.jpg"
        );
    });

    it("Retorna com código de sucesso '200'", () => {
      expect(response).to.have.status(200);
    });
    it("Retorna um objeto como resposta", () => {
      expect(response.body).to.be.an("object");
    });
    it("Retorna um um objeto com a propriedade 'name'", () => {
      expect(response.body).to.have.property("name");
    });
    it("Retorna um um objeto com a propriedade 'ingredients'", () => {
      expect(response.body).to.have.property("ingredients");
    });
    it("Retorna um um objeto com a propriedade 'preparation'", () => {
      expect(response.body).to.have.property("preparation");
    });
    it("Retorna um um objeto com a propriedade 'userId'", () => {
      expect(response.body).to.have.property("userId");
    });
    it("Retorna um um objeto com a propriedade 'image'", () => {
      expect(response.body).to.have.property("image");
    });
  });
});
