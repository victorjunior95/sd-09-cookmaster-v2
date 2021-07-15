const { connection } = require('./connection');

const postIntoDb = async (name, ingredients, preparation) => {
  const db = await connection();

  const collection = await db.collection('recipes');

  const recipe = await collection.insertOne({ name, ingredients, preparation });

  const id = await recipe.insertedId;

  return recipe && { _id: id, name, ingredients, preparation };
};

const getAllRecipesFromDb = async () => {
  const db = await connection();

  const collection = await db.collection('recipes');

  const allRecipes = await collection.find({}).toArray();

  return allRecipes;
};

module.exports = {
  postIntoDb,
  getAllRecipesFromDb,
};
