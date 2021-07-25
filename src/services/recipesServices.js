const recipesModel = require('../models/recipesModel');
const recipesValidations = require('../validations/recipesValidations');

async function addRecipe(token, { name, ingredients, preparation }) {
  recipesValidations.validateName(name);
  recipesValidations.validateIngredients(ingredients);
  recipesValidations.validatePreparation(preparation);
  const decoded = recipesValidations.validateToken(token);
  const response = await recipesModel.addRecipe(decoded.data, name, ingredients, preparation);
  return { status: 201, response };
}

async function getRecipe() {
  const response = await recipesModel.getRecipe();
  return { status: 200, response };
}

async function getRecipeById(id) {
  const response = await recipesModel.getRecipeById(id);
  recipesValidations.validateRecipe(response);
  return { status: 200, response };
}

async function editRecipe(id, token, { name, ingredients, preparation }) {
  recipesValidations.validateAuthentication(token);
  recipesValidations.validateToken(token);
  const response = await recipesModel.editRecipe(id, name, ingredients, preparation);
  return { status: 200, response };
}

async function deleteRecipe(id, token) {
  recipesValidations.validateAuthentication(token);
  await recipesModel.deleteRecipe(id);
  return { status: 204 };
}

module.exports = {
  addRecipe,
  getRecipe,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};
