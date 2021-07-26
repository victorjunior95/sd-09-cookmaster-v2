const { findEmail, insertUser } = require('./usersModel');
const { allRecipes, insertRecipe, findRecipeByID, deleteById } = require('./recipesModel');

module.exports = {
  findEmail,
  insertUser,
  allRecipes,
  insertRecipe,
  findRecipeByID,
  deleteById,
};
