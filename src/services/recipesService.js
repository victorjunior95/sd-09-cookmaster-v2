const recipesModel = require('../models/recipesModel');

// const errorMiddleware = require('../middlewares/errorMiddleware');

const createRecipesService = async (name, ingredients, preparation, userId) => {
  const recipesCreate = await recipesModel.registerRecipes(name, ingredients, preparation, userId);
  // console.log(recipesCreate);
  return recipesCreate;
};

const listRecipesService = async () => {
  const recipes = await recipesModel.listRecipes();
  const listRecipes = [...recipes];
  // console.log('service', listRecipes);
  return listRecipes;
};

const recipesIdService = async (id) => {
  const recipe = await recipesModel.recipesId(id);

  if (!recipe) {
    return {
      err: {
        status: 404,
        message: 'recipe not found',
      },
    };
  }
  return recipe;
};

const editRecipes = async ({ id, name, ingredients, preparation, userId }) => {
  const recipesEdit = await recipesModel.editRecipes({
    id,
    name,
    ingredients,
    preparation,
    userId,
  });

  return recipesEdit;
};

module.exports = {
  createRecipesService,
  listRecipesService,
  recipesIdService,
  editRecipes,
};