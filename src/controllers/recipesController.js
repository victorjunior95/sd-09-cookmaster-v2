const recipesService = require('../services/recipesServices');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const { id } = await recipesService.create({ name, preparation, ingredients, userId });
  return res
    .status(201)
    .json({ recipe: { name, ingredients, preparation, userId, _id: id } });
};

const postImage = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const image = req.file.filename;
  const response = await recipesService.postImage(id, userId, image);
  return res
    .status(200)
    .json(response);
};

const getImage = async (req, res) => {
  const { id } = req.params;
  const response = await recipesService.getImage(id);
  return res
    .status(200)
    .json(response);
};

const getAll = async (_req, res) => {
  const response = await recipesService.getAll();
  return res
    .status(200)
    .json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await recipesService.getById(id);
  return res
    .status(200)
    .json(response);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  await recipesService.updateById(id, name, ingredients, preparation);
  const response = {
    _id: id, 
    userId, 
    name, 
    ingredients,
    preparation,
  };
  return res
    .status(200)
    .json(response);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  await recipesService.deleteById(id, userId);
  return res
    .status(204)
    .json('');
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  postImage,
  getImage,
};