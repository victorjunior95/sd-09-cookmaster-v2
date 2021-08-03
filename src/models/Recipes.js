const connection = require('./connection');

const response = (recipe, code) => ({ result: { recipe }, code });

const createRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connection()
    .then((db) => db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId,
    }))
    .then((data) => { 
      const recipe = { name, ingredients, preparation, userId, _id: data.insertedId };
      return response(recipe, 201);
    });
  return result;
};

const getAllRecipes = async () => {
  const result = await connection()
    .then((db) => db.collection('recipes').find().toArray())
    .then((recipes) => response(recipes, 200));
  return result;
};

module.exports = { createRecipe, getAllRecipes };