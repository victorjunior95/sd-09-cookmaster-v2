const upload = require('../middlewares/uploadFile');
const RecipeService = require('../services/recipes');

const registerRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const recipe = await RecipeService.registerRecipe({ name, ingredients, preparation }, userId);

  return recipe.code
    ? res.status(recipe.code).json({ message: recipe.message })
    : res.status(201).json({ recipe });
};

const getAllRecipes = async (_req, res) => {
  const recipes = await RecipeService.getAllRecipes();

  return res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipeService.getRecipeById(id);

  return recipe.code
    ? res.status(recipe.code).json({ message: recipe.message })
    : res.status(200).json(recipe);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipe = await RecipeService.editRecipe(id, { name, ingredients, preparation });

  return recipe.code
    ? res.status(recipe.code).json({ message: recipe.message })
    : res.status(200).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  await RecipeService.deleteRecipe(id);

  return res.status(204).json({});
};

const addImageToRecipe = [
  upload.single('image'),
  async (req, res) => {
    const { id } = req.params;
    const { filename } = req.file;

    const imageURL = `localhost:3000/src/uploads/${filename}`;

    const recipe = await RecipeService.addImageToRecipe(id, imageURL);

    return res.status(200).json(recipe);
  },
];

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addImageToRecipe,
};
