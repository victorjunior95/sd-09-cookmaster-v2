const Recipe = require('../service/Recipe');

const validateBodyReq = (name, ingredients, preparation) => {
  const params = [name, ingredients, preparation];
  let response = null;
  params.forEach((param) => {
    if (typeof param !== 'string') response = { message: 'Invalid entries. Try again.' };
  });
  return response;
};

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  const invalid = validateBodyReq(name, ingredients, preparation);
  if (invalid) return res.status(400).json(invalid);
  const newRecipe = await Recipe.create(name, ingredients, preparation, user);
  return res.status(201).json(newRecipe);
};

const getAll = async (_req, res) => {
  const recipes = await Recipe.getAll();
  return res.status(200).json(recipes);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (!recipe) return res.status(404).json({ message: 'recipe not found' });
  console.log(recipe);
  return res.status(200).json(recipe);
};

module.exports = { create, getAll, findById };