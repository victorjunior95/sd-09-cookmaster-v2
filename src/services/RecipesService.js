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

module.exports = {
  addRecipe,
  listRecipes,
};