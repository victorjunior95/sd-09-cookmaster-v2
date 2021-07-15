const express = require('express');
const userController = require('../controllers/userController');
const validate = require('../middlewares/validateUserMiddleware');

const router = express.Router();

router.post('/users', 
validate.validateall,
validate.validateEmail, 
userController.addUser);

module.exports = router;
