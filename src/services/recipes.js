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

const deleteById = async (id) => {
  const verifyProduct = await Recipes.getRecipeById(id);

  if (!verifyProduct) {
    return { status: 404, error: { message: 'recipe not found' } };
  }

  const result = Recipes.deleteById(id);

  return result;
};

const insertImageRecipe = async (id, userId, path, role) => Recipes.insertImage(
  id,
  userId, 
  `localhost:3000/${path}`,
  role,
);

module.exports = {
  create,
  getAllRecipes,
  getById,
  editRecipe,
  deleteById,
  insertImageRecipe,
};