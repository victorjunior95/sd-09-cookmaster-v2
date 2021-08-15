const router = require('express').Router();
const { userController } = require('./controllers');
const createUserValidator = require('./validators/createUserValidator');

router.post('/users', createUserValidator, userController.createUser);

module.exports = router;
