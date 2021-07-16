const express = require('express');
const rescue = require('express-rescue');
const validateAdmin = require('../api/auth/validateAdmin');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/admin', validateAdmin, rescue(userController.createAdmin));
router.post('/', rescue(userController.create));

module.exports = router;