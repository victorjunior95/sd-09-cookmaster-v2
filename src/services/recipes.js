const Joi = require('joi');
const path = require('path');
const fs = require('fs').promises;

const Recipes = require('../models/recipes');
const Users = require('../models/users');
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
  const payload = await validateAuth(authorization);

  const getUser = await Users.getByEmail(payload.email);
  const getRecipe = await Recipes.listById(id);

  const { _id: idUser } = getUser;

  const idRecipe = getRecipe.userId.toString();

  if (getUser.role === 'admin' || idUser.toString() === idRecipe) {
    const editRecipe = await Recipes.edit(data, id);

    return editRecipe;
  }

  throw validateError(401, 'unauthorized user');
};

const drop = async (id, authorization) => {
  const payload = await validateAuth(authorization);

  const getUser = await Users.getByEmail(payload.email);
  const getRecipe = await Recipes.listById(id);

  const { _id: idUser } = getUser;

  const idRecipe = getRecipe.userId.toString();

  if (getUser.role === 'admin' || idUser.toString() === idRecipe) {
    const dropRecipe = await Recipes.drop(id);

    return dropRecipe;
  }

  throw validateError(401, 'unauthorized user');
};

const uploadPicture = async (authorization, id, buffer) => {
  await validateAuth(authorization);

  const urlImage = `localhost:3000/src/uploads/${id}.jpeg`;

  const recipe = await Recipes.uploadPicture(id, urlImage);

  const filePath = path.join(__dirname, '..', 'uploads', `${id}.jpeg`);

  await fs.writeFile(filePath, buffer);

  return recipe;
};

module.exports = {
  create,
  list,
  listById,
  edit,
  drop,
  uploadPicture,
};
