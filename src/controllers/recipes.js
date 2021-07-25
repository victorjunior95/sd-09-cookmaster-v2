const Recipes = require('../services/recipes');

const create = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const createRecipe = await Recipes.create(req.body, userId);

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

module.exports = {
  create,
  list,
  listById,
};
