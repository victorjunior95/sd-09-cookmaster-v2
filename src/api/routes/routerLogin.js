const express = require('express');

const router = express.Router();

const Controller = require('../controllers/UserController');

router.post('/', Controller.login);

module.exports = router;