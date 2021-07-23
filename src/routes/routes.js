const express = require('express');
const UsersController = require('../controllers/UsersController');
const RecipesController = require('../controllers/RecipesController');
const PicturesController = require('../controllers/PicturesController');
const validateToken = require('../middlewares/validateToken');
const verifyUser = require('../middlewares/verifyUser');

const router = express.Router();

router.post('/users', UsersController.addNewUser);
router.post('/login', UsersController.userLogin);
router.post('/recipes', validateToken, RecipesController.addNewRecipe);
router.get('/recipes', RecipesController.listRecipe);
router.get('/recipes/:id', RecipesController.listRecipe);
router.put('/recipes/:id', validateToken, RecipesController.updateRecipe);
router.delete('/recipes/:id', validateToken, RecipesController.deleteRecipe);
router.put('/recipes/:id/image/', validateToken, verifyUser, PicturesController.uploadPicture);

module.exports = router;