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

module.exports = {
  create,
};
