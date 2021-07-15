const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', rescue(userController.create));

module.exports = router;