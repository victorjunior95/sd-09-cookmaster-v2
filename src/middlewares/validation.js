const Errors = require('../errors');
const Schemas = require('../schemas');
const Auth = require('../auth');
const UserModel = require('../model/userModel');

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

const token = (req, res, next) => {
  const reqToken = req.headers.authorization;

  if (!reqToken) throw new Errors.InvalidTokenError();

  const { email } = Auth.validateToken(reqToken);

  const { password, ...user } = UserModel.findByEmail(email);

  req.user = user;
  
  next();
};

module.exports = {
  createUser,
  login,
  token,
};
