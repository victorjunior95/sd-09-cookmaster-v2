const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');
const RecipesModel = require('../models/RecipesModel');

const SECRET = 'TH!S!S@s3CR3t';

const createErrorMsg = (status, msg) => ({
  status,
  msg,
});

const RecipesSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const addRecipe = async (recipe, token) => {
  const { error } = RecipesSchema.validate({ ...recipe });
  if (error !== undefined) throw createErrorMsg(400, 'Invalid entries. Try again.');
  
  const payload = jwt.verify(token, SECRET); 

  const currentUser = await UsersModel.findByEmail(payload.email);
  console.log(currentUser);
  const { _id } = currentUser[0];
  const { name, ingredients, preparation } = recipe;
  const idRecipe = await RecipesModel.create(name, ingredients, preparation, _id);
  return { status: 201,
    result: { recipe: {
    _id: idRecipe,
    name,
    ingredients,
    preparation,
    userId: _id,
  } } };
};

const listRecipes = async (id) => {
  const recipes = await RecipesModel.find(id);
  return { status: 200, result: recipes };
};

const updateRecipe = async (id, recipe, token) => {
  const payload = jwt.verify(token, SECRET); 
  const currentUser = await UsersModel.findByEmail(payload.email);
  const currentRecipe = await RecipesModel.find(id);
  const { _id } = currentRecipe;
  const { role } = currentUser[0];
  if (role === 'admin' || currentUser !== undefined) {
    const { name, ingredients, preparation } = recipe;
    await RecipesModel.update(id, name, ingredients, preparation);
    return { status: 200,
      result: {
      _id: id,
      name,
      ingredients,
      preparation,
      userId: _id,
    } };
  }
  throw createErrorMsg(400, 'usuario não é admin');
};

const deleteRecipe = async (id, token) => {
  const payload = jwt.verify(token, SECRET); 
  const currentUser = await UsersModel.findByEmail(payload.email);
  const { role } = currentUser[0];
  if (role === 'admin' || currentUser !== undefined) {
    await RecipesModel.exlude(id);
    return { status: 204 };
  }
  throw createErrorMsg(400, 'usuario não é admin');
};

module.exports = {
  addRecipe,
  listRecipes,
  updateRecipe,
  deleteRecipe,
};