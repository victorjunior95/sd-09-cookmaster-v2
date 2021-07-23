const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.use('/users', UserController);

module.exports = router;
