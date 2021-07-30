const JWT = require('jsonwebtoken');
const service = require('../services/recipes');

const secret = 'bomb';

async function newRecipe(req, res) {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const result = await service.newRecipe(name, ingredients, preparation, userId);
  res.status(201).json({ recipe: result });
}

async function tokenValidation(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const payload = JWT.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    err.code = 'jwtMalformed';
    next(err);
  }
}

async function fetchRecipes(_req, res) {
  const result = await service.fetchRecipes();
  res.status(200).json(result);
}

async function getById(req, res) {
  const { id } = req.params;
  const result = await service.getById(id);
  res.status(200).json(result);
}

async function editRecipe(req, res) {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const result = await service.editRecipe(id, name, ingredients, preparation);
  res.status(200).json(result);
}

async function deleteRecipe(req, res) {
  const { id } = req.params;
  const result = await service.deleteRecipe(id);
  res.status(204).json(result);
}

module.exports = {
  newRecipe,
  tokenValidation,
  fetchRecipes,
  getById,
  editRecipe,
  deleteRecipe,
};
