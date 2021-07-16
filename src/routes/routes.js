const express = require('express');
const { list, register } = require('../controllers/UsersController');
const getError = require('../middlewares/error');
const { validateUser } = require('../middlewares/validateUser');

const router = express.Router();

router.get('/users', list);
  
router.post('/users', validateUser, register);

router.use(getError);

module.exports = router;