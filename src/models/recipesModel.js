const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertRecipe = async (recipe) => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ ...recipe }))
    .then((res) => res.ops[0]);

  return result;
};

const allRecipes = async () => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .find({}).toArray());

  return result;
};

const findRecipeByID = async (id) => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .findOne({ _id: ObjectId(id) }));

  return result;
};

const deleteById = async (id) => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .deleteOne({ _id: ObjectId(id) }));

  return result;
};

const updateRecipeById = async (id, recipe) => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .updateOne(
        {
          _id: ObjectId(id),
        },
        {
          $set: recipe,
        },
      ));
    return result;
};

const insertImageById = async (id, image) => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .updateOne(
        {
          _id: ObjectId(id),
        },
        {
          $set: image,
        },
      ));
  return result;
};

module.exports = {
  allRecipes,
  insertRecipe,
  findRecipeByID,
  deleteById,
  updateRecipeById,
  insertImageById,
};
