const router = require('express').Router();
const { usersController } = require('../controllers');

// User login
router.post('/', usersController.login);

module.exports = router;
