const joi = require('joi');
const { messageError } = require('../middwares/errors');
const recipesModels = require('../models/recipes');

const {
  INVALID_ENTRIES,
  RECIPE_NOT_FOUND } = require('../middwares/errorMessages');

const {
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS } = require('../middwares/httpStatus');

const recipeSchema = joi.object({
  name: joi.string().required(),
  ingredients: joi.string().required(),
  preparation: joi.string().required(),
});

const create = async (recipe, user) => {
  const { name, ingredients, preparation } = recipe;

   const validateRecipe = recipeSchema.validate(recipe);

  if (validateRecipe.error) {
    throw messageError(BAD_REQUEST_STATUS, INVALID_ENTRIES);
  }

  const completeRecipe = {
    name,
    ingredients,
    preparation,
    userId: user.id,
  };

  const newRecipe = await recipesModels.create(completeRecipe);

  return newRecipe;
};

const getAll = async () => recipesModels.getAll();

const getById = async (id) => {
  const recipe = await recipesModels.getById(id);

  if (!recipe) {
    throw messageError(NOT_FOUND_STATUS, RECIPE_NOT_FOUND);
  }

  return recipe;
};

module.exports = {
  create,
  getAll,
  getById,
};