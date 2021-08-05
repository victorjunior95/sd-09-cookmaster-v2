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
  return res.status(200).json(recipe);
};

const edit = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const params = { name, ingredients, preparation };
  const edited = await Recipe.edit(id, params, user);
  if (edited.error) return res.status(edited.error.status).json(edited.error.message);
  return res.status(200).json(edited);
};

const deleteOne = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const deleting = await Recipe.deleteOne(user, id);
  if (!deleting) return res.status(204).end();
  return deleting;
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const add = await Recipe.addImage(id, user);
  if (add.error) return res.status(add.error.status).json(add.error.message);
  return res.status(200).json(add);
};

module.exports = { create, getAll, findById, edit, deleteOne, addImage };