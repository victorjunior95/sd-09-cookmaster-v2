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
  const newRecipe = await recipesModel.registerRecipe({ ...recipe, id });
  return newRecipe;
};

const getAllRecipes = async () => recipesModel.findRecipes();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return recipesModel.findRecipeById(id);
};

module.exports = { createRecipe, getAllRecipes, getById };