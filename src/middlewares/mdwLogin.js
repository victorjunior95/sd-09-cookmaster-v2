const LoginServices = require('../services/LoginServices');

const loginObjectValidator = (req, _res, next) => {
  const { email, password } = req.body;
  const data = LoginServices.loginObjectVerifier(email, password);
  if (data.error) { return next(data); }
  return next();
};

const loginExistsValidator = async (req, _res, next) => {
  const { email, password } = req.body;
  const data = await LoginServices.loginExistsVerifier(email, password);
  const { _id, role } = data;
  req.body.id = _id;
  req.body.role = role;
  if (data.error) { return next(data); }
  return next();
};

const loginTokenGenerator = (req, res, _next) => {
  const { id, email, role } = req.body;
  const data = LoginServices.tokenGenerator({ id, email, role });
  return res.status(200).json(data);
};

const loginTokenValidator = (req, _res, next) => {
  const token = req.headers.authorization;
  const data = LoginServices.tokenValidator(token);
  req.body = { ...req.body, ...data };
  if (data.error) { return next(data); }
  return next();
};

module.exports = {
  loginObjectValidator,
  loginExistsValidator,
  loginTokenGenerator,
  loginTokenValidator,
};
