const Joi = require('@hapi/joi');
const Recipes = require('../models/recipes');

const ValidObjectCreateRecipe = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const create = async ({ name, ingredients, preparation, userId }) => {
 const { error } = ValidObjectCreateRecipe.validate({
    name,
    ingredients,
    preparation,
  });

  if (error) {
    return {
      status: 400,
      error: {
        message: 'Invalid entries. Try again.',
      },
    };
  }

  const recipe = await Recipes.create(name, ingredients, preparation, userId);
  return recipe;
};

const getAllRecipes = async () => {
 const allRecipes = Recipes.getAllRecipes();

 if (allRecipes.length === 0) {
   return {
    status: 400,
    error: {
      message: 'No recipes.',
    },
   };
 }

 return allRecipes;
};

const getById = async (id) => {
  const recipe = await Recipes.getRecipeById(id);

  if (!recipe) {
    return {
      status: 404, 
      error: {
        message: 'recipe not found',
      },
    };
  }

  return recipe;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const { error } = ValidObjectCreateRecipe.validate({
    name,
    ingredients,
    preparation,
  });

  if (error) {
    return {
      status: 404, 
      error: {
        message: 'recipe not found',
      },
    };
  }

  const updateRecipe = await Recipes.editRecipe(id, name, ingredients, preparation);

  return updateRecipe;
};

module.exports = {
  create,
  getAllRecipes,
  getById,
  editRecipe,
};