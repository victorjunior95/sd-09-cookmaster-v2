const router = require('express').Router();
const { userController, recipeController } = require('./controllers');
const jwtAuth = require('./middlewares/jwtAuth');
const multer = require('./middlewares/multer');
const createRecipeValidator = require('./validators/createRecipeValidator');
const createUserValidator = require('./validators/createUserValidator');
const loginValidator = require('./validators/loginValidator');

router.post('/users', createUserValidator, userController.createUser);
router.post('/login', loginValidator, userController.login);

router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', recipeController.getRecipe);
router.post('/recipes', jwtAuth, createRecipeValidator, recipeController.createRecipe);
router.put('/recipes/:id', jwtAuth, recipeController.editRecipe);
router.delete('/recipes/:id', jwtAuth, recipeController.remove);

router.put('/recipes/:id/image', jwtAuth, multer.single('image'), recipeController.addPhoto);

module.exports = router;
