const router = require('express').Router();
const { usersController } = require('../controllers');
const middlewares = require('../middlewares');

// Create users
router.post('/', usersController.createUser);

// Create admins
router.post('/admin', middlewares.authentication, usersController.createAdmin);

module.exports = router;
