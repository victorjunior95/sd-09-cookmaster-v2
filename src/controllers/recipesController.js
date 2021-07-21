const recipesService = require('../services/recipesService');

const recipesController = async (req, res, _next) => {
  const { id } = req.user;
 // console.log('users', users);
  const { name, ingredients, preparation } = req.body;
  // console.log('service', name);
  const newRecipes = await recipesService.createRecipesService(name, ingredients, preparation, id);
  return res.status(201).json({ recipe: newRecipes });
};

const listRecipeController = async (_req, res) => {
  const listRecipes = await recipesService.listRecipesService();

  return res.status(200).json(listRecipes);
};

const recipeIdController = async (req, res, next) => {
  const { id } = req.params;
  const recipeId = await recipesService.recipesIdService(id);
  if (recipeId.err) {
    return next(recipeId.err);
  }
  // console.log(recipeId, 'resposta sem image');

  return res.status(200).json(recipeId);
};

const recipeEditController = async (req, res, _next) => {
  const { id } = req.params;
  const { user } = req;
  const { id: userId } = user;
  const { name, ingredients, preparation } = req.body;

  const recipesEdit = await recipesService.editRecipes({
    id,
    name,
    ingredients,
    preparation,
    userId,
  });

  return res.status(200).json(recipesEdit);
};

const deleteRecipeController = async (req, res, next) => {
  const { id } = req.params;

  const excludeRecipe = await recipesService.deleteRecipes(id);
  if (excludeRecipe.err) {
    return next(excludeRecipe.err);
  }
  return res.status(204).json(excludeRecipe);
};

const uploadImage = async (req, res, _next) => {
  const { filename } = req.file;
  const { id } = req.params;
  const urlImage = `localhost:3000/src/uploads/${filename}`;
  await recipesService.uploadImage(urlImage, id);
  // enviar informações para o banco (atualizar o banco de dados)
  const image = await recipesService.recipesIdService(id);
  // pegar as informações atualizadas do banco de dados
  // console.log(image, 'resposta com image');
  return res.status(200).json(image);
};

module.exports = {
  recipesController,
  listRecipeController,
  recipeIdController,
  recipeEditController,
  deleteRecipeController,
  uploadImage,
};