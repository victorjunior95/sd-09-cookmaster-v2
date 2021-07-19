const router = require('express').Router();
const users = require('./users');
const login = require('./login');
const recipes = require('./recipes');
const images = require('./images');

router.use('/users', users);
router.use('/login', login);
router.use('/recipes', recipes);
router.use('/images', images);

module.exports = router;
