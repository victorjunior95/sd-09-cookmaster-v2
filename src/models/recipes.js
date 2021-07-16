const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerRecipe = async ({ name, ingredients, preparation }, userId) => {
  const { ops } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  return ops[0];
};

const getAllRecipes = () => connection().then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

  return recipe;
};

const editRecipe = async (id, { name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) return null;

  await connection()
    .then(
      (db) => db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
    );

  const recipe = await getRecipeById(id);

  return recipe;
};

const deleteRecipe = async (id) => {
  await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

const addImageToRecipe = async (id, imageURL) => {
  if (!ObjectId.isValid(id)) return null;

  await connection()
    .then(
      (db) => db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { image: imageURL } }),
    );

  const recipe = await getRecipeById(id);

  return recipe;
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addImageToRecipe,
};
