const rescue = require('express-rescue');
const { createRecipe, fetchRecipes } = require('../controllers/Recipes');
const { validateToken } = require('../middlewares');

const RecipesRoutes = (app) => {
  app.route('/recipes')
    .get(fetchRecipes)
    .post(validateToken, rescue(createRecipe));
};

module.exports = RecipesRoutes;