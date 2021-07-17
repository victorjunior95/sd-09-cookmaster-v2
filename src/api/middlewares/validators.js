const validate = require('../utils/validators');

const user = (req, _res, next) => validate.user(req.body)
  .then(() => next())
  .catch((err) => next(err));

const userExists = (req, _res, next) => validate.userExists(req.body)
  .then(() => next())
  .catch((err) => next(err));

const login = (req, _res, next) => validate.login(req.body)
  .then(() => next())
  .catch((err) => next(err));

module.exports = { user, userExists, login };
