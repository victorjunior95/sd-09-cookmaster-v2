const express = require('express');
const UsersRouter = require('../controllers/UsersController')
const RecipesRouter = require('../controllers/RecipesController')
const LoginRouter = require('../controllers/LoginController')
const router = express.Router();

router.use('/users', UsersRouter)
router.use('/login', LoginRouter)
router.use('/recipes', RecipesRouter)

module.exports = router;