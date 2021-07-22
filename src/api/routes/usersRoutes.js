const express = require('express');
const usersController = require('../../controllers/usersController');
const { validateUsersFields, validateToken, verifyAdmin } = require('../../middlewares');

const router = express.Router();

router.post('/', [validateUsersFields, usersController.add]);
router.post('/admin', [validateUsersFields, validateToken, verifyAdmin, usersController.addAdmin]);

module.exports = router;
