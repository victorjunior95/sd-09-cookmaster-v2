const jwtDecode = require('jwt-decode');
const RecipeService = require('../services/RecipeService');

function getUserIdFromToken(token) {
  const { _id } = jwtDecode(token);
  return _id;
}

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;
  const userId = getUserIdFromToken(authorization);

  const { _id } = await RecipeService.createRecipe(name, ingredients, preparation, userId);

  return res.status(201).json({ recipe: { name, ingredients, preparation, userId, _id } });
};

const getRecipes = async (_req, res) => {
  const recipes = await RecipeService.getRecipes();

  return res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipeService.getRecipeById(id);

  if (recipe === null) return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).json(recipe);
};

const updateRecipe = async (req, res) => {
  const { params: { id }, body, user } = req;
  const { _id } = user;
  const userId = _id;

  const recipe = await RecipeService.updateRecipe(id, body, userId);

  if (recipe === null) return res.status(404).json({ message: 'recipe not found' });
  
  return res.status(200).json({ _id: id, ...body, userId });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const deleted = await RecipeService.deleteRecipe(id);

  if (deleted === null) return res.status(404).json({ message: 'recipe not found' });
  console.log(deleted);
  return res.status(204).send('');
};

const uploadPicture = [
  RecipeService.uploadPicture.single('image'),
  async (req, res) => {
    if (req.fileValidationError) {
      return res.status(403).json({ error: { message: 'Extension must be "jpeg"' } });
    }
    const { params: { id } } = req;
    const url = `localhost:3000/src/uploads/${id}.jpeg`;

    const recipeWithUrl = await RecipeService.isertUrlImage(id, url); 
    return res.status(200).json(recipeWithUrl);
  },
];

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadPicture,
};