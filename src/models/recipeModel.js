const { ObjectId } = require('mongodb');
const connection = require('../config/connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await connection().then((db) => db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }));
  return { 
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: recipe.insertedId,
    },
  };
};

const getAllRecipes = async () => connection().then((db) => db
    .collection('recipes')
    .find().toArray());

const getRecipeById = async (id) => connection().then((db) => db
    .collection('recipes')
    .findOne(ObjectId(id)));

const updateRecipe = async (id, entries, userId) => {
  if (!ObjectId(id)) {
    return null;
  }

  const { name, ingredients, preparation } = entries;
  const db = await connection();
  await db
    .collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    );
  return { _id: id, name, ingredients, preparation, userId };
};

const deleteRecipe = async (id) => connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const uploadImg = async (id, image) => {
  await connection().then((db) => 
    db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } }));
  const recipeImg = await getRecipeById(id);
  return recipeImg;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImg,
};
