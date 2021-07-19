const router = require('./router');

const UsersController = require('../controllers/UsersController');

router.post('/users', UsersController.registerUser);
