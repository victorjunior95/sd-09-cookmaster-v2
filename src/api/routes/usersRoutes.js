const express = require('express');
const usersController = require('../../../controllers/usersController');
const { validateUsersFields } = require('../../../middlewares');

const router = express.Router();

router.post('/', [validateUsersFields, usersController.addUser]);

module.exports = router;
