const { recipesService } = require('../services');
const { PermissionError } = require('../errors');

module.exports = async (req, _res, next) => {
  try {
    const { id: recipeId } = req.params;
    const { role, _id: userId } = req.user;

    const recipe = await recipesService.getById(recipeId);
    const { _id: _, userId: userIdImg, ...recipeData } = recipe;

    if (role === 'admin' || userId.toString() === userIdImg.toString()) {
      req.recipe = { ...recipeData, id: recipeId };
      return next();
    }

    throw new PermissionError('You\'re not allowed to do this!');
  } catch (err) {
    return next(err);
  }
};