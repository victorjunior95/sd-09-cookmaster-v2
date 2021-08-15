const router = require('express').Router();
const { userController } = require('./controllers');
const createUserValidator = require('./validators/createUserValidator');
const loginValidator = require('./validators/loginValidator');

router.post('/users', createUserValidator, userController.createUser);
router.post('/login', loginValidator, userController.login);

module.exports = router;
