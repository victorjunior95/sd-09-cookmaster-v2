const recipesServices = require('../services/recipesServices');

const postNewRecipe = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const result = await recipesServices.postNewRecipe({ name, ingredients, preparation, userId });

  res.status(201).json({ recipe: {
    name, ingredients, preparation, userId, _id: result,
  } });
};

module.exports = {
  postNewRecipe,
};
