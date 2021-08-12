const connection = require('./connection');

const defaulRecipe = ({ name, ingredients, preparation, userId, image, _id }) => {
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

  return defaulRecipe(data);
};

module.exports = { postRecipes };
