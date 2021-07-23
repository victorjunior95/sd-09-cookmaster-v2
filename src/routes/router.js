const express = require('express');
const UsersRouter = require('../controllers/usersController');
const LoginRouter = require('../controllers/loginController');
const RecipesRouter = require('../controllers/recipesController');

const router = express.Router();

router.use('/users', UsersRouter);
router.use('/login', LoginRouter);
router.use('/recipes', RecipesRouter);

module.exports = router;
