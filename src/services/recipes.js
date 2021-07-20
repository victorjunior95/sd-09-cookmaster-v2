const jwt = require('jsonwebtoken');
const USER = require('../models/users');
const RECIPES = require('../models/recipes');

const secret = 'secret';
    
const create = async (name, ingredients, preparation, token) => {
  try {   
    if (!name || !ingredients || !preparation) {
      return ({ message: 'Invalid entries. Try again.' });
    }
    const decoded = jwt.verify(token, secret);
    const { _id } = await USER.getUser(decoded.data);
    const createRecipe = await RECIPES.create(name, ingredients, preparation, _id);
    return createRecipe;
  } catch (err) {
    return err;
  }
};

const getAll = async () => RECIPES.getAll();

module.exports = {
  create,
  getAll,
};