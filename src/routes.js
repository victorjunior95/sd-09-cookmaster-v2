const router = require('express').Router();
const { userController } = require('./controllers');

router.post('/users', userController.createUser);

module.exports = router;
