const Recipes = require('../services/recipes');
const upload = require('../middlewares/uploadConfig');
 
const create = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const recipe = await Recipes.create({ name, ingredients, preparation, userId });
  if (recipe.error) return next(recipe);

   res.status(201).send({ recipe });
};

const getAllRecipes = async (_req, res, _next) => {
  const alllRecipes = await Recipes.getAllRecipes();

  res.status(200).send(alllRecipes);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await Recipes.getById(id);

  if (recipe.error) return next(recipe);

  res.status(200).json(recipe);
};

const editRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const updateRecipe = await Recipes.editRecipe(id, name, ingredients, preparation);

  if (updateRecipe.error) return next(updateRecipe);

  res.status(200).json(updateRecipe);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  // const { userId, role } = req;
  
  const recipe = await Recipes.deleteById(id);

  if (recipe.error) return next(recipe);

  return res.status(204).json(recipe);
};

const insertImageRecipe = [
upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req;
  const result = await Recipes.insertImageRecipe(id, userId, req.file.path, role);
  console.log(result);
  res.status(200).json(result);
},
];

module.exports = {
  create,
  getAllRecipes,
  getById,
  editRecipe,
  deleteById,
  insertImageRecipe,
};