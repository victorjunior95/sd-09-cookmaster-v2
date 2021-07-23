const Joi = require('joi');
const recipesModel = require('../models/recipesModel');

const recipesValidationSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': 'Invalid entries. Try again.' }),
  ingredients: Joi.string().required().messages({ 'any.required': 'Invalid entries. Try again.' }),
  preparation: Joi.string().required().messages({ 'any.required': 'Invalid entries. Try again.' }),
});

const validationError = (status, message) => ({ status, message });

const createRecipe = async (recipe, user) => {
  const { error } = recipesValidationSchema.validate(recipe);
  if (error) throw validationError(400, error.message);
  const recipeToCreate = { ...recipe, userId: user.id };
  const newRecipe = await recipesModel.createRecipe(recipeToCreate);
  return newRecipe;
};

const updateRecipe = async (id, user, recipe) => {
  const recipeToUpdate = await recipesModel.getRecipeById(id);
  if (!recipeToUpdate) throw validationError(404, 'recipe not found');
  const { error } = recipesValidationSchema.validate(recipe);
  if (error) throw validationError(400, error.message);
  if (recipeToUpdate.userId === user.id || user.role === 'admin') {
    const updatedRecipe = await recipesModel.updateRecipe(id, recipe);
    return updatedRecipe;
  }
  throw validationError(403, 'forbidden action');
};

const deleteRecipe = async (id, user) => {
  const recipeToDelete = await recipesModel.getRecipeById(id);
  if (!recipeToDelete) throw validationError(404, 'recipe not found');
  if (recipeToDelete.userId === user.id || user.role === 'admin') {
    return recipesModel.deleteRecipe(id);
  }
  throw validationError(403, 'forbidden action');
};

const addRecipeImage = async (id) => {
  const image = `localhost:3000/src/uploads/${id}.jpeg`;
  const recipeWithImage = await recipesModel.addRecipeImage(id, image);
  return recipeWithImage;
};

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addRecipeImage,
};
