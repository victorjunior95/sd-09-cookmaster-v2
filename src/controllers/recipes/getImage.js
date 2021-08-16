const { ObjectID } = require('mongodb');
const { resolve } = require('path');
const RecipeModel = require('../../models/recipes');

const SUCCESS_CODE = 200;
const NOT_FOUND_CODE = 404;
const NOT_FOUND_MESSAGE = 'recipe not found';

module.exports = async (req, res, _next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(NOT_FOUND_CODE).json({ message: NOT_FOUND_MESSAGE });
  }

  const response = await RecipeModel.getOneRecipe(id);

  if (!response) {
    return res.status(NOT_FOUND_CODE).json({ message: NOT_FOUND_MESSAGE });
  }

  const imagePath = resolve(__dirname, '../../..', response.image.split('3000/')[1]);

  res.status(SUCCESS_CODE).sendFile(imagePath);
};
