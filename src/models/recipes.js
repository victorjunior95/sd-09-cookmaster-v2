const { ObjectId } = require('mongodb');
const connection = require('../config/connection');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await connection()
  .then((db) => 
    db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
return { name, ingredients, preparation, userId, _id: newRecipe.insertedId };
};

const getAllRecipes = async () => {
  const getRecipes = await connection()
  .then((db) => 
    db.collection('recipes')
      .find().toArray());
  return getRecipes;
};

const getOneRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const getRecipe = await connection()
    .then((db) =>
      db.collection('recipes')
        .findOne({ _id: ObjectId(id) }));
  return getRecipe;
};

const update = async (id, updRecipe, userId, role) => {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const { name, ingredients, preparation } = updRecipe;
  let recipeUser = await getOneRecipe(id);
  recipeUser = await recipeUser.userId;
  if (JSON.stringify(userId) === JSON.stringify(recipeUser) || role === 'admin') { 
  await connection()
  .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
return { _id: id, name, ingredients, preparation, userId };
  } 
  return undefined;
};

module.exports = { 
  create,
  getAllRecipes,
  getOneRecipe,
  update,
 };