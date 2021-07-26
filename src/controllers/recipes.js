const Recipes = require('../services/recipes');

const create = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const createRecipe = await Recipes.create(req.body, authorization);

    return res.status(201).json({ recipe: { ...createRecipe } });
  } catch (error) {
    return next(error);
  }
};

const list = async (_req, res, next) => {
  try {
    const listRecipe = await Recipes.list();

    return res.status(200).json(listRecipe);
  } catch (error) {
    return next(error);
  }
};

const listById = async (req, res, next) => {
  try {
    const listRecipe = await Recipes.listById(req.params.id);

    return res.status(200).json(listRecipe);
  } catch (error) {
    return next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;

    const editRecipe = await Recipes.edit(req.body, id, authorization);

    return res.status(200).json(editRecipe);
  } catch (error) {
    return next(error);
  }
};

const drop = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;

    const dropRecipe = await Recipes.drop(id, authorization);

    return res.status(204).json(dropRecipe);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  list,
  listById,
  edit,
  drop,
};
