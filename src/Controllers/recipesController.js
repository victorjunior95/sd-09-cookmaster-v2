const recipesService = require('../services/recipesService');

const create = async (req, res) => {
  const newRecipe = await recipesService.create(req.user, req.body);
  return res.status(201).json(newRecipe);
};

module.exports = {
  create,
};
