const { create } = require('../services/recipes');

const createRecipes = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipe = await create(name, ingredients, preparation, userId);
  console.log(recipe);
  return res.status(201).json({ recipe });
};

module.exports = { createRecipes };
