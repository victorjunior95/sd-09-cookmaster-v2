const attRecipe = require('../../services/recipes/attRecipe');
const { getRecipe, getOne } = require('../../services/recipes/getRecipe');
const setRecipe = require('../../services/recipes/postRecipe');
const delRecipe = require('../../services/recipes/removeRecipe');
const { 
  STATUS_CREATED,
  STATUS_OK,
  STATUS_NO_CONTENT,
} = require('../../services/utils/constants');

const postRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const response = await setRecipe(name, ingredients, preparation, req.user);

  if (response.error) return next(response);

  res.status(STATUS_CREATED).json({ recipe: response.message });
};

const getRecipes = async (_req, res, next) => {
  const response = await getRecipe();

  if (response.error) return next(response);

  res.status(STATUS_OK).json(response.message);
};

const getOneRecipe = async (req, res, next) => {
  const { id } = req.params;
  const response = await getOne(id);

  if (response.error) return next(response);

  res.status(STATUS_OK).json(response.message);
};

const putRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const response = await attRecipe(id, { name, ingredients, preparation }, req.user);

  if (response.error) return next(response);
  
  res.status(STATUS_OK).json(response.message);
};

const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;

  const response = await delRecipe(id, req.user);

  if (response.error) return next(response);

  res.status(STATUS_NO_CONTENT).end();
};

const postImage = async (req, res, next) => {
  const { id } = req.params;

  const response = await getOne(id);

  if (response.error) return next(response);

  const imagePath = `localhost:3000/src/uploads/${req.file.filename}`;

  res.status(STATUS_OK).json({ ...response.message, image: imagePath });
};

module.exports = {
  postRecipe,
  getOneRecipe,
  getRecipes,
  putRecipe,
  deleteRecipe,
  postImage,
};
