const { ObjectId } = require('mongodb');
const connection = require('../api/connection');

const addRecipe = async (name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
    .then((result) => result.ops[0]);

const getAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connection().then((db) => db.collection('recipes')
    .findOne({ _id: new ObjectId(id) }));
  return recipe;
};

const updateRecipe = async (id, data) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connection().then((db) => db.collection('recipes')
    .updateOne({ _id: new ObjectId(id) },
      {
        $set: {
          name: data.name,
          ingredients: data.ingredients,
          preparation: data.preparation
        }
      }));
  return recipe;
};

const delRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connection().then((db) => db.collection('recipes')
    .deleteOne({ _id: new ObjectId(id) }));
  return recipe;
};

const updateRecipeWithImage = async (recipeToUpdate, path) => {
  const { id, name, ingredients, preparation, userId } = recipeToUpdate;
  const image = path;
  if (!ObjectId.isValid(id)) return null;
  connection().then((db) => db.collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation, userId, image } },
    ));
  return { _id: id, name, ingredients, preparation, userId, image };
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipe,
  delRecipe,
  updateRecipe,
  updateRecipeWithImage,
};
