const express = require('express');

const Controller = require('../controllers/UserController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

router.post('/', Controller.createUser);
router.post('/admin', validateToken, Controller.createAdmin);

module.exports = router;