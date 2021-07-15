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
  const { _id } = data;
  req.body.id = _id;
  if (data.error) { return next(data); }
  return next();
};

const loginTokenGenerator = (req, res, _next) => {
  const { id, email } = req.body;
  const data = LoginServices.tokenGenerator({ id, email });
  return res.status(200).json(data);
};

const loginTokenValidator = (req, _res, next) => {
  const token = req.headers.authorization;
  const data = LoginServices.tokenValidator(token);
  req.body = { ...req.body, ...data };
  if (data.error) { return next(data); }
  console.log('passei pela validação do token');
  return next();
};

module.exports = {
  loginObjectValidator,
  loginExistsValidator,
  loginTokenGenerator,
  loginTokenValidator,
};
