const express = require('express');

const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.use('/users', userController);
router.use('/login', loginController);
router.use('/recipes', recipesController);

module.exports = router;
