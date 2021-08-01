const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/', usersController.newUser);
router.get('/', (req, res, _next) => {
  res.status(200).json('teste');
});

module.exports = router;