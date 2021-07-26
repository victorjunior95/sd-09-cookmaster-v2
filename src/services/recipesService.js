const Joi = require('joi');
const recipesModel = require('../models/recipesModel');

const HTTP_BADREQ_STATUS = 400;
const HTTP_CREATED_STATUS = 201;
const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
const HTTP_NOCONTENT_STATUS = 204;

const schemaValidateRecipes = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const create = async (name, ingredients, preparation, userId) => {
  const validateCreate = schemaValidateRecipes.validate({
    name, ingredients, preparation,
  });
  if (validateCreate.error) {
    return {
      status: HTTP_BADREQ_STATUS,
      err: 'Invalid entries. Try again.',
    };
  }
  const recipe = await recipesModel.create(name, ingredients, preparation, userId);
  return {
    status: HTTP_CREATED_STATUS, recipe,
  };
};

const listAllRecipes = async () => {
  const recipesAll = await recipesModel.listAll();
  return {
    status: HTTP_OK_STATUS, recipesAll,
  };
};

const getRecipeById = async (id) => {
  const recipeById = await recipesModel.getRecipeById(id);
  if (!recipeById) {
    return {
      status: HTTP_NOTFOUND_STATUS, err: 'recipe not found',
    };
  }
  return {
    status: HTTP_OK_STATUS, recipeById,
  };
};

const updateRecipesById = async (id, { name, ingredients, preparation }) => {
  const recipeUpdate = await recipesModel.update(id, name, ingredients, preparation);
  return { status: HTTP_OK_STATUS, recipeUpdate };
};

const deleteRecipeById = async (id) => {
  const recipeDeleted = await recipesModel.exclude(id);
  return { status: HTTP_NOCONTENT_STATUS, recipeDeleted };
};

const updateImage = async (id, image) => {
  const recipeImage = await recipesModel.updateImage(id, image);
  return { status: HTTP_OK_STATUS, recipeImage };
};

module.exports = {
  create,
  listAllRecipes,
  getRecipeById,
  updateRecipesById,
  deleteRecipeById,
  updateImage,
};
