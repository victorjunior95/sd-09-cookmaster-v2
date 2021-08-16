const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();

  const newUser = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return newUser.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();

  const allUsers = await db.collection('recipes')
    .find().toArray();

  return allUsers;
};

module.exports = {
  create,
  getAllRecipes,
};