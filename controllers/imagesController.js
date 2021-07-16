const rescue = require('express-rescue');
const recipesService = require('../services/recipesService');

const getImageByRecipeId = rescue(async (req, res, next) => {
  const { filename } = req.params;

  const imagePath = await recipesService.getImageByRecipeId(filename);

  if (!imagePath) {
    return next({
      status: 404,
      message: 'recipe not found',
    });
  }

  const element = `<img src=${imagePath}/>`;

  return res.status(200).send(element);
});

module.exports = {
  getImageByRecipeId,
};
