const { ObjectId } = require('mongodb');
const connection = require('../middlewares/conn');

const registerRecipe = async (name, ingredients, preparation, id) => {
  const newRecipe = await connection().then((db) =>
    db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId: id,
    }).then((result) => result.ops[0]));
  return newRecipe;
};

const getAllRecipes = async () => {
  const result = await connection().then((db) =>
    db.collection('recipes').find({}).toArray());
  return result;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection().then((db) =>
    db.collection('recipes').findOne({ _id: ObjectId(id) }));
  return result;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const result = await connection().then((db) =>
    db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          ingredients,
          preparation,
        },
      },
      {
        returnOriginal: false,
      },
      ).then((res) => res.value));
  return result;
};

const deleteRecipe = async (id) => {
  const result = await connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return result;
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
