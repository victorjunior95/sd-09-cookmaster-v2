const express = require('express');
const validateUser = require('../schemas/userSchemas');

const usersControllers = require('../controllers/usersControllers');

const router = express.Router();

router.use('/users', validateUser, usersControllers.createUser);

module.exports = router;
