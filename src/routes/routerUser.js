const express = require('express');

const Controller = require('../controllers/UserController');

const router = express.Router();

router.post('/', Controller.createUser);

module.exports = router;