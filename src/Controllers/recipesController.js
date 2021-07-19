const recipesService = require('../services/recipesService');
const upload = require('../middlewares/upload');

const create = async (req, res) => {
  const newRecipe = await recipesService.create(req.user, req.body);
  return res.status(201).json(newRecipe);
};

const getAll = async (_req, res) => {
  const recipes = await recipesService.getAll();
  return res.status(200).json(recipes);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getOne(id);
  return res.status(200).json(recipe);
};

const update = async (req, res) => {
  const { id } = req.params;
  const newRecipe = await recipesService.update(id, req.user, req.body);
  return res.status(200).json(newRecipe);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  await recipesService.exclude(id);
  return res.status(204).json();
};

const imgUpload = [upload.single('image'), async (req, res) => {
  const { path } = req.file;
  const { id } = req.params;
  console.log(path);
  const recipe = await recipesService.upload(id, path);
  return res.status(200).json(recipe);
}];

module.exports = {
  create,
  getAll,
  getOne,
  update,
  exclude,
  imgUpload,
};
