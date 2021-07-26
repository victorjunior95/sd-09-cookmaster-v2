const Joi = require('joi');
const { ObjectId } = require('mongodb');
const recipesModel = require('../model/recipesModel');
const { validateError } = require('./validateError');

const RecipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const createRecipe = async (recipe, id) => {
  const { error } = RecipeSchema.validate(recipe);
  if (error) throw validateError(400, 'Invalid entries. Try again.');
  return recipesModel.registerRecipe({ ...recipe, userId: id });
};

const getAllRecipes = async () => recipesModel.findRecipes();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return recipesModel.findRecipeById(id);
};

const recipeUpdate = async (id, recipe) => {
  if (!ObjectId.isValid(id)) return null;
  return recipesModel.updateRecipe(id, recipe);
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return recipesModel.deleteOne(id);
};

module.exports = { createRecipe, getAllRecipes, getById, recipeUpdate, deleteById };