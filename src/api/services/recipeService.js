const recipeModel = require('../models/recipeModel');
const {status, message} = require('../services/statusAndMessages');

const recipeCheck = async(req, res, next) => {
  const {name, ingredients, preparation} = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(status.BAD_REQUEST).json(message.invalidEntries);
  }
  return next();
};

const recipeGetByIdCheck = async(req, res, next) => {
  const { id } = req.params;
  const result = await recipeModel.getByIdRecipe(id);
  console.log(result);
  console.log('teste');
  if (!result) {
    return res.status(status.NOT_FOUND).json(message.recipeNotFound);
  }
  req.recipe = result;
  return next();
};

module.exports = {recipeCheck, recipeGetByIdCheck};