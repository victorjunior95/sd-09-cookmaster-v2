const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.use('/users', UserController.UserRouter);
router.use('/login', UserController.AuthRouter);

module.exports = router;
