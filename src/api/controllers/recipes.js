const { CREATED_STATUS, OK_STATUS } = require('../middwares/httpStatus');

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

const getAll = async (req, res, _next) => {
  const recipes = await recipesServices.getAll();

  return res.status(OK_STATUS).json(recipes);
};

module.exports = {
  create,
  getAll,
};