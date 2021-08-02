const rescue = require('express-rescue');
const {
  createRecipe,
  fetchRecipes,
  findById,
  editRecipe,
  addImageToRecipe,
  deleteRecipe } = require('../controllers/Recipes');
const { validateToken, upload } = require('../middlewares');

const RecipesRoutes = (app) => {
  app.route('/recipes')
    .get(fetchRecipes)
    .post(validateToken, rescue(createRecipe)); // validar token

  app.route('/recipes/:id')
    .get(rescue(findById))
    .put(validateToken, editRecipe)
    .delete(validateToken, deleteRecipe);

  app.route('/recipes/:id/image')
    .put(validateToken, upload, addImageToRecipe);
};

module.exports = RecipesRoutes;
