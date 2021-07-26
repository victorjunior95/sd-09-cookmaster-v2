const connection = require('./connection');

async function createRecipe({ name, ingredients, preparation, userId }) {
  const db = await connection();
  const recipes = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  const result = recipes.ops[0];
  const { password: _, ...recipe } = result;
  return { recipe };
}

async function findAll() {
  const db = await connection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
}

module.exports = {
  createRecipe,
  findAll,
};