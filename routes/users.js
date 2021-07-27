const express = require('express');
const usersController = require('../controller/usersController');
const validateJWT = require('../controller/validateJWT');

const router = express.Router();

router.post('/', usersController.postUser);
router.post('/admin', validateJWT, usersController.postAdmin);
module.exports = router;
