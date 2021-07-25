const { create, getAll, getById, updateRecipe, deleteRecipe } = require('../services/recipes');

const createRecipes = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipe = await create(name, ingredients, preparation, userId);
  // console.log(recipe);
  return res.status(201).json({ recipe });
};

 const getAllRecipes = async (_req, res) => {
   try {
    const recipes = await getAll();
    return res.status(200).json(recipes);
   } catch (error) {
     console.log(error);
   }
};

const searchById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getById(id);
    res.status(200).json(result);
  } catch ({ message }) {
   next({ status: 404, message });
  }
};

const recipeUpdate = async (req, res) => {
  const { _id: userId } = req.user;

  const { id } = req.params;
  const recipe = await updateRecipe({ id, ...req.body, userId });
  return res.status(200).json(recipe);
};

const recipeDelete = async (req, res) => {
  const { id } = req.params;
  const recipe = await deleteRecipe(id);
  return res.status(204).json(recipe);
};
// getAllRecipes().then((r) => console.log(r));
module.exports = { createRecipes, getAllRecipes, searchById, recipeUpdate, recipeDelete };
