const express = require('express');
const user = require('./userRouter');
const recipe = require('./recipesRouter');

const router = express.Router();

router.use('/users', user);
router.use('/recipes', recipe);

module.exports = router;
