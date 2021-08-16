const router = require('express').Router();
const { userController, recipeController } = require('./controllers');
const jwtAuth = require('./middlewares/jwtAuth');
const createRecipeValidator = require('./validators/createRecipeValidator');
const createUserValidator = require('./validators/createUserValidator');
const loginValidator = require('./validators/loginValidator');

router.post('/users', createUserValidator, userController.createUser);
router.post('/login', loginValidator, userController.login);

router.get('/recipes', recipeController.getAllRecipes);
router.post('/recipes', jwtAuth, createRecipeValidator, recipeController.createRecipe);

module.exports = router;
