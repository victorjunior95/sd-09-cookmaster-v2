const {
  createRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
} = require('../services/recipeService');

const createRecipesControl = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const { id } = await createRecipeService({ name, preparation, ingredients, userId });

  return res.status(201)
    .json({ recipe: { name, ingredients, preparation, userId, _id: id } });
};

const getAllRecipesControl = async (_req, res) => {
  const result = await getAllRecipesService();

  return res.status(200).json(result);
};

const getRecipeByIdControl = async (req, res) => {
  const { id } = req.params;
  const result = await getRecipeByIdService(id);

  return res.status(200).json(result);
};

module.exports = {
  createRecipesControl,
  getAllRecipesControl,
  getRecipeByIdControl,
};