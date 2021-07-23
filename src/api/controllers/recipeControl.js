const { createRecipeService } = require('../services/recipeService');

const createRecipesControl = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const { id } = await createRecipeService({ name, preparation, ingredients, userId });

  return res
    .status(201)
    .json({ recipe: { name, ingredients, preparation, userId, _id: id } });
};

module.exports = {
  createRecipesControl,
};