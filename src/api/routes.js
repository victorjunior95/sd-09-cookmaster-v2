const express = require('express');
const router = express.Router();

const validateUser = require('../schemas/userSchemas')

const usersControllers = require('../controllers/usersControllers');

router.use('/users',validateUser, usersControllers.createUser);

module.exports = router;
