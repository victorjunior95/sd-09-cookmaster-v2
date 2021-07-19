const Joi = require('joi');
const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const validateRecipe = Joi.object({
  name: Joi.string().required(),
  preparation: Joi.string().required(),
  ingredients: Joi.string().required(),
});

const create = async ({ name, preparation, ingredients, userId }) => {
    const { error } = validateRecipe.validate({ name, ingredients, preparation });
    if (error) return { error: 'Invalid entries. Try again.', status: 400 };
  
    const idObject = await recipesModel.create({ name, preparation, ingredients, userId });
    return idObject;
  };

  const getAll = async () => {
    const recipes = await recipesModel.getAll();
    return recipes;
  };

  const getById = async (id) => {
    if (!ObjectId.isValid(id)) return { error: 'recipe not found', status: 404 };
    const recipe = await recipesModel.getById(id);
    if (!recipe) return { error: 'recipe not found', status: 404 };
    return recipe;
  };

  module.exports = {
    create,
    getAll,
    getById,
  }; 