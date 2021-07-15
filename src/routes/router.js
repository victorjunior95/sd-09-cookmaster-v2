const express = require('express');
const UserController = require('../controller/userController');

const router = express.Router();

router.use('/users', UserController);

module.exports = router;