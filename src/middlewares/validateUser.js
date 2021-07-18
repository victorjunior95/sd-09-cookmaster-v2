const recipeModel = require('../models/recipeModels');
// const errors = require('../utils/errors');

const validateUser = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  const { _id, role } = user;
  const findRecipe = await recipeModel.getRecipeByIdModel(id);
  
//   if (!findRecipe) {
//  return res.status(errors.jwtErr.status)
//       .json(errors.notFoundErr.response); 
// }
  if (findRecipe.userId === _id || role
     === 'admin') return next();
  if (findRecipe.userId !== _id || role
    !== 'admin') return res.status(200).json({ message: 'Não foi possivel atualizar' });
};

module.exports = validateUser;