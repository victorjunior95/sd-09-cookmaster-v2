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

module.exports = {
  addRecipe,
};
