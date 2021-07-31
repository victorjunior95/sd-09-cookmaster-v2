const recipesService = require('../services/recipesServices');
const setImage = require('../middlewares/setImage');

const createRecipe = (req, res) => recipesService.createRecipe(req.body, req.user)
  .then(({ status, recipe }) => res.status(status).json({ recipe }));

const recipesList = (_req, res) => recipesService.recipesList()
  .then(({ status, data }) => res.status(status).json(data));

const getRecipeById = (req, res) => recipesService.getRecipeById(req.params.id)
  .then(({ status, recipe }) => res.status(status).json(recipe));

const updateRecipe = (req, res) => recipesService.updateRecipe(req.params.id, req.body, req.user)
  .then(({ status, userId }) => res.status(status)
  .json({ _id: req.params.id, ...req.body, userId }));

const removeRecipe = (req, res) => recipesService.removeRecipe(req.params.id)
  .then(({ status }) => res.status(status).json());

const setImageRecipe = [setImage.single('image'),
 (req, res) => recipesService.setImageRecipe(req.params.id, req.file.path)
  .then(({ status, data }) => res.status(status).json(data))];

module.exports = {
  createRecipe,
  recipesList,
  getRecipeById,
  updateRecipe,
  removeRecipe,
  setImageRecipe,
};
