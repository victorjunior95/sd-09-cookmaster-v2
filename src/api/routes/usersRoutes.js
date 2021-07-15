const express = require('express');
const usersController = require('../../../controllers/usersController');
const { validateFields } = require('../../../middlewares');

const router = express.Router();

router.post('/', [validateFields, usersController.addUser]);

module.exports = router;
