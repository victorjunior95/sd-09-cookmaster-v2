const { create } = require('../services/recipes');

const createRecipes = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, ingredients, preparation } = req.body;
  const newRecipe = await create(name, ingredients, preparation, userId);
  return res.status(201).json({ newRecipe });
};

module.exports = { createRecipes };
