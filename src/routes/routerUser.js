const express = require('express');
const userController = require('../controllers/UsersController');

const router = express.Router();

router.post('/', userController.checkBody, userController.registerUser);

module.exports = router;
