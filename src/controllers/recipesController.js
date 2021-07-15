const recipesService = require('../services/recipesServices');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const { id } = await recipesService.create({ name, preparation, ingredients, userId });
  return res
    .status(201)
    .json({ recipe: { name, ingredients, preparation, userId, _id: id } });
};

module.exports = {
  create,
};