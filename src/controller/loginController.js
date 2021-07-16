const express = require('express');
const Validation = require('../middlewares/validation');
const LoginService = require('../service/userService');
const ErrorHandler = require('../middlewares/errorHandler');
const StatusCode = require('../statusCode');

const router = express.Router();

router.post('/', Validation.login, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await LoginService.create(email, password);
    return res.status(StatusCode.created).json({ token });
  } catch (err) {
    next(err);
  }
});

router.use(ErrorHandler);

module.exports = router;