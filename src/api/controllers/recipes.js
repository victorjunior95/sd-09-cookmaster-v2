const recipes = require('../services/recipes');
const upload = require('../utils/upload');

const create = async (req, res) => {
  const { body, user } = req;
  const { status, ...jsonResponse } = await recipes.create(body, user);
  res.status(status).json(jsonResponse);
};

const getAll = async (_req, res) => {
  const { status, recipesList } = await recipes.getAll();
  res.status(status).json(recipesList);
};

const getById = async (req, res) => {
  const { status, ...jsonResponse } = await recipes.getById(req.params.id);
  res.status(status).json(jsonResponse);
};

const update = async (req, res) => {
  const { status, userId } = await recipes.update(req.params.id, req.body, req.user);
  res.status(status).json({ _id: req.params.id, ...req.body, userId });
};

const remove = async (req, res) => {
  const { status } = await recipes.remove(req.params.id);
  res.status(status).json();
};

const putImage = [upload.single('image'),
  (req, res) => recipes.putImage(req.params.id, req.file.path)
    .then(({ status, data }) => res.status(status).json({ ...data, userId: req.params.id }))];

module.exports = { create, getAll, getById, update, remove, putImage };