const Errors = require('../errors');
const Schemas = require('../schemas');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  const { error } = Schemas.createUser.validate({ name, email, password });

  if (error) throw new Errors.InvalidUserFormError();

  next();
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = Schemas.login.validate({ email, password });

  if (error) throw new Errors.LoginFieldMissingError();

  next();
};

module.exports = {
  createUser,
  login,
};
