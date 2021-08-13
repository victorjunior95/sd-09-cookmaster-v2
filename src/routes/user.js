const express = require('express');
const controller = require('../controller/user');

const router = express.Router();

router.post('/', controller.addUserPost);
router.post('/admin', controller.postAdmin);

module.exports = router;