const recipes = require('../services/recipesService');

const create = async (req, res) => {
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;
  const result = await recipes.create({ name, ingredients, preparation }, token);
  return res.status(201).json(result);
 };

 const findAll = async (req, res) => {
  const result = await recipes.findAll();
  return res.status(200).json(result);
 };

 const findById = async (req, res) => {
  const { id } = req.params;
  const result = await recipes.findById(id);
  return res.status(200).json(result);
 };

module.exports = {
  create,
  findAll,
  findById,
};
