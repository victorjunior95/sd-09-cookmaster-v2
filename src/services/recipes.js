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

const update = async (id, updRecipe, token) => {
  try {
    const { name, ingredients, preparation } = updRecipe;
    if (!name || !ingredients || !preparation) {
      return null;
    }
    const decoded = jwt.verify(token, secret);
    const { role, _id } = await USER.getUser(decoded.data);
    const upd = await RECIPES.update(id, updRecipe, _id, role);
    return upd;
  } catch (err) {
    return err;
  }
};

const deleteRecipe = async (id, token) => {
    const decoded = jwt.verify(token, secret);
    const { role, _id } = await USER.getUser(decoded.data);
    return RECIPES.deleteRecipe(id, _id, role);
};

const uploadImage = async (urlImage, id) => {
  await RECIPES.uploadImage(urlImage, id);
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteRecipe,
  uploadImage,
};