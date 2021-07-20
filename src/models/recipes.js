const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, id) => {
  const db = await connection();
  const addRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId: id });
  return addRecipe.ops[0];
};

const recipesById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)));
};

const recipesByname = async (name) =>
  connection().then((db) => db.collection('recipes').findOne(name));

const getAll = () => connection().then((db) => db.collection('recipes').find().toArray());

const uptadeRecipes = async (id, name, ingredients, preparation) => {
  const db = await connection();
  const setUpdate = await db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    );
  
  return setUpdate;
};

const deletRecipes = async (id) => connection().then((db) => db.collection('recipes').deleteOne({
    _id: ObjectId(id),
  }));

module.exports = {
  createRecipes,
  recipesById,
  recipesByname,
  getAll,
  uptadeRecipes,
  deletRecipes,
};
