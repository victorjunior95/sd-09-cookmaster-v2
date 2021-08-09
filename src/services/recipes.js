const Joi = require('joi');
const model = require('../models/recipes');

function recipeValidation(name, ingredients, preparation) {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });
  if (error) {
    error.code = 'badRequest'; 
    throw error;
  }
}

async function newRecipe(name, ingredients, preparation, userId) {
  recipeValidation(name, ingredients, preparation);
  const result = await model.newRecipe(name, ingredients, preparation, userId);
  return result;
}

async function fetchRecipes() {
  const result = await model.fetchRecipes();
  return result;
}

async function getById(id) {
  const result = await model.getById(id);
  if (!result) {
    const error = new Error();
    error.code = 'recipeNotFound';
    throw error;
  }
  return result;
}

async function editRecipe(id, name, ingredients, preparation) {
  const result = await model.editRecipe(id, name, ingredients, preparation);
  return result;
}

async function deleteRecipe(id) {
  const result = await model.deleteRecipe(id);
  return result;
}

async function addImg(id, image) {
  const result = await model.addImg(id, image);
  return result;
}

module.exports = {
  newRecipe,
  fetchRecipes,
  getById,
  editRecipe,
  deleteRecipe,
  addImg,
};
