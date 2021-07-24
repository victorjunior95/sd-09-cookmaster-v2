const { Router } = require('express');
const UserController = require('../controllers/UserController');
const RecipeController = require('../controllers/RecipeController');

const router = Router();

router.use('/users', UserController.UserRouter);
router.use('/login', UserController.AuthRouter);
router.use('/recipes', RecipeController.RecipeRouter);

module.exports = router;
