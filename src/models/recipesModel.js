const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipesModel = async (name, ingredients, preparation, id) => {
  const newRecipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId: id }));
  return newRecipe.ops[0];
};

const getAllRecipesModel = async () => {
  const allRecipes = await connection().then((db) =>
    db.collection('recipes').find({}).toArray());

  return allRecipes;
};

const getRecipeByIdModel = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const recipe = await connection().then((db) =>
    db.collection('recipes').findOne({ _id: new ObjectId(id) }));
    return recipe;
};

const editRecipeModel = async (name, ingredients, preparation, id) => {
  if (!ObjectId.isValid(id)) return null;

  await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

  const updatedRecipe = await connection().then((db) =>
    db.collection('recipes').findOne({ _id: new ObjectId(id) }));

  return updatedRecipe;
};

const updateWithImageModel = async (id, file) => {
  if (!ObjectId.isValid(id)) return null;

  const urlImage = `localhost:3000/src/uploads/${file.filename}`

  await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image: urlImage } }));

  const updatedRecipe = await connection().then((db) =>
    db.collection('recipes').findOne({ _id: new ObjectId(id) }));

    console.log(updatedRecipe)

  return updatedRecipe;
};


const deleteRecipeModel = async (id) => {
  const deletedRecipe = await connection()
    .then((db) => db.collection('recipes')
      .findOneAndDelete({ _id: ObjectId(id) }));
  return deletedRecipe;
};

module.exports = {
  createRecipesModel,
  getAllRecipesModel,
  getRecipeByIdModel,
  editRecipeModel,
  deleteRecipeModel,
  updateWithImageModel,
};
