const recipes = require('../services/recipes');

const create = (req, res) => recipes.create(req.body, req.user)
  .then(({ status, recipe }) => res.status(status).json({ recipe }));

const getAll = (_req, res) => recipes.getAll()
  .then(({ status, data }) => res.status(status).json(data));

const getById = (req, res) => recipes.getById(req.params.id)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = { create, getAll, getById };
