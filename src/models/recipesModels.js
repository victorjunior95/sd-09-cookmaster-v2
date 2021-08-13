const { ObjectId } = require('mongodb');
const connection = require('./connection');

const defaultRecipe = ({ name, ingredients, preparation, userId, image, _id }) => {
  if (!image) {
    return { name, ingredients, preparation, userId, _id };
  }

  return { name, ingredients, preparation, userId, _id, image };
};

const postRecipes = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });

  const data = newRecipe.ops[0];

  return defaultRecipe(data);
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();

  return recipes.map(defaultRecipe); 
};

const getRecipesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const recipeId = ObjectId(id);
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: recipeId });

  return defaultRecipe(recipe);
};

module.exports = { postRecipes, getRecipes, getRecipesById };
