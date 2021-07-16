const recipesModel = require('../models/recipesModel');

const validateUser = async (req, res, next) => {
  const { id: recipeId } = req.params;
  const { _id: userId, role } = req.user;

  const recipe = await recipesModel.getById(recipeId);

  if ((recipe.userId.toString() !== userId.toString()) && role !== 'admin') {
    return next({ status: 401, message: 'jwt malformed' });
  }

  return next();
};

module.exports = validateUser;
