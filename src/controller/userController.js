const express = require('express');
const Validation = require('../middlewares/validation');
const UserService = require('../service/userService');
const ErrorHandler = require('../middlewares/errorHandler');

const router = express.Router();

router.post('/', Validation.createUser, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const created = await UserService.create(name, email, password);
    return res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.use(ErrorHandler);

module.exports = router;