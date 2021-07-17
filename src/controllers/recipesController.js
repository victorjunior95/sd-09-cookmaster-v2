const recipes = require('../services/recipesService');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const result = await recipes.create({ name, ingredients, preparation });
  return res.status(201).json(result);
 };

module.exports = {
  create,
};
