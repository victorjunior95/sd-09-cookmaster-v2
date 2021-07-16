const recipesServices = require('../services/recipesServices');

const postNewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const result = await recipesServices.postNewRecipe({ name, ingredients, preparation, userId });

  res.status(201).json({ recipe: {
    name, ingredients, preparation, userId, _id: result,
  } });
};

const getAllRecipes = async (req, res) => {
  const result = await recipesServices.getAllRecipes();
  res.status(200).json(result);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  const result = await recipesServices.getRecipeById(id);

  if (result.code) return next(result);

  res.status(200).json(result);
};

const updateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { userId, role } = req;

  const payload = { name, ingredients, preparation, id, userId, role };

  const result = await recipesServices.updateRecipe(payload);

  if (result.code) return next(result);

  if (result.modifiedCount === 0) return next({ code: 400, message: 'Não foi possivel atualizar' });

  res.status(200).json({
    _id: id, name, ingredients, preparation, userId });
};

module.exports = {
  postNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
