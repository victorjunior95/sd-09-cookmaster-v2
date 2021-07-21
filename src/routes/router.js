const express = require('express');
const UserRouter = require('../controllers/UsersController');

const router = express.Router();

router.use('/users', UserRouter);

module.exports = router;
