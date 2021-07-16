const express = require('express');
const usersControllers = require('../controllers/usersControllers');
const userValidation = require('../middlewares/userValidation');

const router = express.Router();

router.post('/', userValidation, usersControllers.registerNewUser);

module.exports = router;
