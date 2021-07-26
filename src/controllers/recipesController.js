const rescue = require('express-rescue');
const Recipes = require('../service/recipesServices');
const OK = 200

const createNewRecipe = rescue(async (req, res) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const recipes = await Recipes.createNewRecipesService(
    name, ingredients, preparation, userId,
  );

  return res.status(201).json(recipes);
});

const getAllRecipes = async (_req, res) => {
  const rcp = await Recipes.allRecipes();

  return res.status(OK).json(rcp);
};

const oneRecp = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getOneRecipe(id);
  
  return res.status(OK).json(recipe);
});

const rcpUpdate = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const rcp = await Recipes.updtRcp(id, name, ingredients, preparation);
  
  return res.status(OK).json(rcp);
});

const rcpDelet = async (req, res) => {
  const { id } = req.params;
  await Recipes.deletRcp(id);

  return res.status(204).end();
};

const createImg = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const imgCreated = await Recipes.createdIMG(id, path);

  return res.status(OK).json(imgCreated);
};


module.exports = {
  createNewRecipe,
  getAllRecipes,
  oneRecp,
  rcpUpdate,
  rcpDelet,
  createImg,
};
