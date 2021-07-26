const Joi = require('joi');

const Recipes = require('../models/recipes');
const validateAuth = require('../middlewares/validateAuth');

const JoiSchema = Joi.object({
  name: Joi.string().not().empty().required(),
  ingredients: Joi.string().not().empty().required(),
  preparation: Joi.string().not().empty().required(),
});

const validateError = (statusCode, message) => ({
  statusCode,
  message,
});

const create = async (data, authorization) => {
  const auth = await validateAuth(authorization);

  const { error } = JoiSchema.validate(data);

  if (error) {
    throw validateError(400, 'Invalid entries. Try again.');
  }

  const { _id: id } = auth;

  const createUser = await Recipes.create({
    ...data,
    userId: id,
  });

  return createUser;
};

const list = async () => {
  const listRecipe = await Recipes.list();

  return listRecipe;
};

const listById = async (id) => {
  const listRecipe = await Recipes.listById(id);

  if (!listRecipe) {
    throw validateError(404, 'recipe not found');
  }

  return listRecipe;
};

const edit = async (data, id, authorization) => {
  await validateAuth(authorization);

  const editRecipe = await Recipes.edit(data, id);

  return editRecipe;
};

module.exports = {
  create,
  list,
  listById,
  edit,
};
