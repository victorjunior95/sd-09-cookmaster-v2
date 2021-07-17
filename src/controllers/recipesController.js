const recipes = require('../services/recipesService');

const create = async (req, res) => {
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;
  const result = await recipes.create({ name, ingredients, preparation }, token);
  return res.status(201).json(result);
};

const findAll = async (_req, res) => {
  const result = await recipes.findAll();
  return res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await recipes.findById(id);
  return res.status(200).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;
  const result = await recipes.update({ name, ingredients, preparation }, token, id);
  return res.status(200).json(result);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const result = await recipes.exclude(token, id);
  return res.status(204).json(result);
};

const addImage = async (req, res) => {
  const filePath = req.file.path;
  const { id } = req.params;
  const token = req.headers.authorization;
  const result = await recipes.addImage(token, id, filePath);
  return res.status(200).json(result);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
  addImage,
};
