const express = require('express');
const UsersRouter = require('../controllers/usersController');

const router = express.Router();

router.use('/users', UsersRouter);
// router.use('/', Controller);

router.use((error, _req, res, _next) => res.status(error.code).json(error.err));

module.exports = router;
