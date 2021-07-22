const recipesService = require('../services/recipesService');

const HTTP_NOTFOUND_STATUS = 404;

module.exports = async (req, _res, next) => {
  const { _id, role } = req.user;
  const { id } = req.params;
  try {
    const recipe = await recipesService.getRecipeById(id);
    if (recipe.err) return next(recipe);
    if (role !== 'admin'
      && !recipe.recipeById.userId.toString() === _id.toString()
    ) {
      return next({
        status: HTTP_NOTFOUND_STATUS, err: 'User without permission to change',
      });
    }
    // se não cair em nenhum dos anteriores, vai para o próximo caminho
    next();
  } catch (error) {
    next(error);
  }
};