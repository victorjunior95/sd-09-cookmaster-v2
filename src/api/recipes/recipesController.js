const RecipesService = require('./recipesService');
const RecipesModel = require('./recipesModel');

const create = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const recipe = await RecipesService.create({ name, ingredients, preparation, userId });

  return res.status(201).json({ recipe });
};

const getAll = async (_req, res) => {
  const recipes = await RecipesModel.getAll();

  return res.status(200).json(recipes);
};

module.exports = {
  create,
  getAll,
};
