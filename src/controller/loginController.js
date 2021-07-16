const express = require('express');
const Validation = require('../middlewares/validation');
const LoginService = require('../service/loginService');
const ErrorHandler = require('../middlewares/errorHandler');
const StatusCode = require('../statusCode');

const router = express.Router();

router.post('/', Validation.login, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);
    return res.status(StatusCode.ok).json({ token });
  } catch (err) {
    next(err);
  }
});

router.use(ErrorHandler);

module.exports = router;