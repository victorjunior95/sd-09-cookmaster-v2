const express = require('express');
const path = require('path');
const UserController = require('../controllers/UserController');
const RecipeController = require('../controllers/RecipeController');

const { Router } = express;

const router = Router();

router.use('/users', UserController.UserRouter);
router.use('/login', UserController.AuthRouter);
router.use('/recipes', RecipeController.RecipeRouter);
router.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = router;
