const path = require('path');
const fs = require('fs').promises;

const recipeService = require('../services/recipeService');
const uploadFile = require('../middlewares/upload');

const createRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const { userId } = req;

  const newRecipe = await recipeService.validateNewRecipe(
    name,
    ingredients,
    preparation,
  );

  return newRecipe.message
    ? next(newRecipe)
    : res.status(201).json({ recipe: { userId, ...newRecipe } });
};

const getAllRecipes = async (_req, res, _next) => {
  const allRecipes = await recipeService.getAllRecipes();
  return res.json(allRecipes);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await recipeService.getRecipeById(id);

  return recipe.message ? next(recipe) : res.json(recipe);
};

const updateRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;

  const { name, ingredients, preparation } = req.body;

  const uptadatedRecipe = await recipeService.updateRecipe(id, name, ingredients, preparation);

  return uptadatedRecipe.message ? next(uptadatedRecipe) : res.json({ userId, ...uptadatedRecipe });
};

const deleteRecipe = async (req, res, _next) => {
  const { id } = req.params;

  await recipeService.deleteRecipe(id);

  return res.status(204).end();
};

const uploadImage = [
  uploadFile.single('image'),
  async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req;
    const fileInformation = req.file;
    const buffer = fileInformation.buffer || undefined;

    if (!buffer) return next({ message: 'deu ruim', statusCode: 400 });

    const filePath = path.join(__dirname, '..', 'uploads', `${id}.jpeg`);

    await fs.writeFile(filePath, buffer);

    const imgPath = path.join('localhost:3000', 'src', 'uploads', `${id}.jpeg`);

    const recipe = await recipeService.addRecipeImg(id, imgPath);

    return res.json({
      userId,
      ...recipe,
    });
  },
];

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
