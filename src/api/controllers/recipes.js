const recipes = require('../services/recipes');

const create = async (req, res) => {
  const { body, user } = req;
  const { status, ...jsonResponse } = await recipes.create(body, user);
  res.status(status).json(jsonResponse);
};

module.exports = { create };