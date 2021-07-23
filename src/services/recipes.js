const jwt = require('jsonwebtoken');
const USER = require('../models/users');
const RECIPES = require('../models/recipes');

const secret = 'secret';
    
const create = async (name, ingredients, preparation, token) => {
  try {   
    if (!name || !ingredients || !preparation) {
      return false;
    }
    const decoded = jwt.verify(token, secret);
    const { _id } = await USER.getUser(decoded.data);
    const recipe = await RECIPES.create(name, ingredients, preparation, _id);
    return recipe;
  } catch (err) {
    return err;
  }
};

const getAll = async () => RECIPES.getAllRecipes();

const getOne = async (id) => RECIPES.getOneRecipe(id);

module.exports = {
  create,
  getAll,
  getOne,
};