const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUserModel = async ({ name, email, password, role }) => {
    const newUser = await connection()
      .then((db) => db.collection('users').insertOne({
        name,
        email,
        password,
        role,
      }));

    const response = {
      user: {
        name,
        email,
        role,
        _id: newUser.insertedId,
      },
    };
    return response;
};

const findByemail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return user;
};

const createRecipeModel = async ({ name, ingredients, preparation, userId }) => {
  const newRecipes = await connection()
    .then((db) => db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId,
    }));

  const recipeCreated = {
    recipe: { 
      name,
      ingredients,
      preparation,
      userId,
      _id: newRecipes.insertedId,
    }, 
  };
  return recipeCreated;
};

const listAllRecipesModel = async () => {
  const allRecipes = await connection()
  .then((db) => db.collection('recipes').find().toArray());
  return allRecipes;
};

const listRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipeById = await connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

  return recipeById;
};

module.exports = {
  createUserModel,
  findByemail,
  createRecipeModel,
  listAllRecipesModel,
  listRecipeById,
};
