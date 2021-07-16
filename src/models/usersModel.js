// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getNewUser = (userData) => {
  const { _id, name, email, role } = userData;

  return {
    user: {
      name,
      email, 
      role,
      _id,
    },
  };
};

const getNewRecipe = (recipeData) => {
  const { _id, name, ingredients, preparation, userId } = recipeData;

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id,
    },
  };
};

const getUserByEmail = async (email) => connection()
    .then((db) => db.collection('users').findOne({ email }));

const createUser = async (name, email, password) => {
  const role = 'user';
  return connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role })
    .then((result) => getNewUser({ _id: result.insertedId, name, email, role })));
};

const createRecipe = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId })
    .then((result) => getNewRecipe({ 
      _id: result.insertedId, name, ingredients, preparation, userId })));

module.exports = {
  createUser,
  getUserByEmail,
  createRecipe,
};