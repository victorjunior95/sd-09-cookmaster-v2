const jwt = require('jsonwebtoken');
const recipeModel = require('../models/recipeModel');

const SECRET = 'xinforinfola'; // SECRETE aqui apenas para fins didaticos

const registerNewRecipe = async (name, ingredients, preparation, token) => {
  const { id } = jwt.verify(token, SECRET);
  const newRecipe = await recipeModel.registerRecipe(name, ingredients, preparation, id);
  return newRecipe;
};

module.exports = { registerNewRecipe };
