const Joi = require('joi');

const RecipesShema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const validateError = (status, message) => ({ status, message });

const createRecipe = async (recipe) => {
  const { error } = RecipesShema.validate(recipe);

  if (error) {
    throw validateError(401, error.message);
  }
};

const listRecipes = () => list;

const findById = (id) => id;

const updateRecipes = (id, recipes) => {
  const { error } = RecipesShema.validate(recipes);
  if (error) {
    throw validateError(401, error.message);
  }
};

const deleteRecipe = (id) => id;

module.exports = {
  createRecipe,
  listRecipes,
  findById,
  updateRecipes,
};