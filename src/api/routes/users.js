const router = require('express').Router();
const { usersController } = require('../controllers');

// Create users
router.post('/', usersController.create);

module.exports = router;
