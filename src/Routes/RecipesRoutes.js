const rescue = require('express-rescue');
const {
  createRecipe,
  fetchRecipes,
  findById,
  editRecipe,
  deleteRecipe } = require('../controllers/Recipes');
const { validateToken } = require('../middlewares');

const RecipesRoutes = (app) => {
  app.route('/recipes')
    .get(fetchRecipes)
    .post(validateToken, rescue(createRecipe));
  app.route('/recipes/:id')
    .get(rescue(findById))
    .put(validateToken, editRecipe)
    .delete(validateToken, deleteRecipe);
};

module.exports = RecipesRoutes;
