const connection = require('./connection');

const recipes = 'recipes';

const addRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const response = await db.collection(recipes)
    .insertOne({ name, ingredients, preparation, userId });
  return { recipe: response.ops[0] };
};

const getAllRecipes = async () => {
  const db = await connection();
  const response = await db.collection(recipes).find().toArray();
  return response;
};

module.exports = {
  addRecipe,
  getAllRecipes,
};
