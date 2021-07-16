const recipesModel = require('../models/recipesModel');

const error = { status: 400, message: 'Invalid entries. Try again.' };

const validateRecipe = ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) throw error;
};

const create = async ({ _id }, recipe) => {
  validateRecipe(recipe);
  const schemaRecipe = {
    ...recipe,
    userId: _id,
  };
  const newRecipe = await recipesModel.create(schemaRecipe);
  return {
    recipe: newRecipe,
  };
};

module.exports = {
  create,
};
