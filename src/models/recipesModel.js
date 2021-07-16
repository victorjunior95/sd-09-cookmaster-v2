const connection = require('./connection');
// const response = require('../middlewares/responseCodes');

const postRecipe = async (recipeInfo, userInfo) => {
  const { _id } = userInfo;
  const { name, ingredients, preparation } = recipeInfo;
  const newRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({
        name,
        ingredients,
        preparation,
        userId: _id,
    }));
    return newRecipe.ops[0];
};

const getAllRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

module.exports = {
  postRecipe,
  getAllRecipes,
};
