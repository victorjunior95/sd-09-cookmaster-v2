const express = require('express');
const usersRouter = require('./users/usersRouter');

const router = express.Router();

router.use('/users', usersRouter);

module.exports = router;
