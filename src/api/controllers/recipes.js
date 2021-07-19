const { CREATED_STATUS, OK_STATUS, NO_CONTENT_STATUS } = require('../middwares/httpStatus');

const recipesServices = require('../services/recipes');

const create = async (req, res, next) => {
  try {
    const recipe = req.body;
    const { user } = req;

    const newRecipe = await recipesServices.create(recipe, user);
    
    return res.status(CREATED_STATUS).json(newRecipe);
  } catch (err) {
  next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = req.body;
    const { user } = req;

    const token = await recipesServices.edit(id, recipe, user);

    return res.status(OK_STATUS).json(token);
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req, res, _next) => {
  const recipes = await recipesServices.getAll();

  return res.status(OK_STATUS).json(recipes);
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await recipesServices.getById(id);

    return res.status(OK_STATUS).json(recipe);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await recipesServices.getById(id);

    return res.status(NO_CONTENT_STATUS).json();
  } catch (err) {
    next(err);
  }
};

const upload = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = `localhost:3000/${req.file.path}`;

    const uploadImage = await recipesServices.upload(id, image);
    return res.status(OK_STATUS).json(uploadImage);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  edit,
  getAll,
  getById,
  remove,
  upload,
};