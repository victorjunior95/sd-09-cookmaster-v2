const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/', loginController.login);
router.get('/', (req, res, _next) => {
  res.status(200).json('teste');
});

module.exports = router;