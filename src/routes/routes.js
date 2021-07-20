const express = require('express');
// const validateToken = require('../services/validateToken');
const users = require('../controllers/users');

const router = express.Router();

router.post('/users', users.createUser);

router.post('/login', users.login);

module.exports = router;