const recipesModel = require('./recipes.model');
const loginService = require('../login/login.service');

const recipeValidation = ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) {
    return { status: 400, data: { message: 'Invalid entries. Try again.' } };
  }
};

const createRecipe = async (newRecipe, token) => {
  const recipeError = recipeValidation(newRecipe);
  
  if (recipeError) return recipeError;

  const tokenData = await loginService.tokenValidator(token);

  if (!tokenData) return { status: 401, data: { message: 'jwt malformed' } };

  const { _id } = tokenData;
  const recipe = await recipesModel.addRecipe({ ...newRecipe, userId: _id });

  return { status: 201, data: { recipe } };
};

const listRecipes = async () => {
  const data = await recipesModel.listRecipes();

  return { status: 200, data };
};

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);

  if (!recipe) return { status: 404, data: { message: 'recipe not found' } };

  return { status: 200, data: recipe };
};

const tokenVerifications = async (token) => {
  if (!token) return { status: 401, data: { message: 'missing auth token' } };
  const tokenData = await loginService.tokenValidator(token);
  if (!tokenData) return { status: 401, data: { message: 'jwt malformed' } };
};

const canEdit = async (role, userId, recipeId) => {
  const recipe = await recipesModel.getRecipeById(recipeId);

  return role === 'admin' || userId === recipe.userId;
};

const updateRecipeById = async (id, data, token) => {
  const recipeError = recipeValidation(data);
  if (recipeError) return recipeError;

  const tokenError = await tokenVerifications(token);
  if (tokenError) return tokenError;

  const { role, _id } = await loginService.tokenValidator(token);

  if (await canEdit(role, _id, id)) {
    const recipe = await recipesModel.updateRecipeById(id, data);

    return { status: 200, data: recipe };
  }
};

module.exports = {
  createRecipe,
  listRecipes,
  getRecipeById,
  updateRecipeById,
};
