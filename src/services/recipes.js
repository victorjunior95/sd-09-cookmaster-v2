const jwt = require('jsonwebtoken');
const recipesModel = require('../models/recipes');

const secret = 'senhaPower';

const createRecipes = async (name, ingredients, preparation, token) => {
  const { id } = jwt.verify(token, secret);
  const create = await recipesModel.createRecipes(
    name,
    ingredients,
    preparation,
    id,
  );
  // console.log(create);
  return { message: { recipe: create } };
};

const getAll = async () => recipesModel.getAll();

const recipesById = async (id) => recipesModel.recipesById(id);

const updateRecipeById = async (id, name, ingredients, preparation) => {
    const update = await recipesModel.uptadeRecipes(id, name, ingredients, preparation);
    return update;
  };

module.exports = {
  createRecipes,
  getAll,
  recipesById,
  updateRecipeById,
};
