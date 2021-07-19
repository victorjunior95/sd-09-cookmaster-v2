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

const listRecipeByUserId = async (userId) => {
  if (!ObjectId.isValid(userId)) return null;

  const recipeByUserId = await connection()
  .then((db) => db.collection('recipes').findOne({ userId: ObjectId(userId) }));

  return recipeByUserId;
};

const updateRecipe = async (name, ingredients, preparation, recipeId) => {
  if (!ObjectId.isValid(recipeId)) return null;

  const recipeUpdated = await connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(recipeId) },
      { $set: { name, ingredients, preparation } },
    ));
  return recipeUpdated.result;
};

const deleteRecipe = async (recipeId) => {
  if (!ObjectId.isValid(recipeId)) return null;
  
  const recipeDeleted = await connection()
    .then((db) => db.collection('recipes').deleteOne(
      { _id: ObjectId(recipeId) },
    ));

  return recipeDeleted;
};

const addURLimage = async (recipeId, urlImage) => {
  if (!ObjectId.isValid(recipeId)) return null;
  
  const recipes = await connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(recipeId) },
      { $set: { image: urlImage } },
    ));

    return recipes;
};

module.exports = {
  createUserModel,
  findByemail,
  createRecipeModel,
  listAllRecipesModel,
  listRecipeById,
  updateRecipe,
  listRecipeByUserId,
  deleteRecipe,
  addURLimage,
};
