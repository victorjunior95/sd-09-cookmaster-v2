const Joi = require('joi');
const model = require('../models/Recipes');

const validateRecipe = (name, preparation, ingredients) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    preparation: Joi.string().required(),
    ingredients: Joi.string().allow('').required(),
  }).validate({ name, ingredients, preparation });

  if (error) {
    error.statusCode = 'badRequest';
    throw error;
  }
};

// const userOwnsRecipe = async (recipeId, userId) => {
//   const recipe = await model.findById(recipeId);
//   if (userId !== recipe.userId) {
//     const error = new Error();
//     // error.statusCode = 
//   }
// };

const createRecipe = async (name, preparation, ingredients, userId) => {
  validateRecipe(name, preparation, ingredients);
  const result = await model.createRecipe(name, preparation, ingredients, userId);
  return result;
};

const findById = async (id) => {
  const result = await model.findById(id);
  if (!result) {
    const error = new Error();
    error.statusCode = 'notFound';
    throw error;
  }
  return result;
};

const editRecipe = async (id, name, preparation, ingredients) => {
  const result = await model.editRecipe(id, name, preparation, ingredients);
  return result;
};

const deleteRecipe = async (id) => 
  model.deleteRecipe(id);

const fetchRecipes = async () =>
  model.fetchRecipes();

module.exports = {
  createRecipe,
  fetchRecipes,
  findById,
  editRecipe,
  deleteRecipe,
};
