const { validateRegex } = require('../schemas');

module.exports = (req, _res, next) => {
  const { email, password } = req.body;

  const isEmailValid = validateRegex(
    /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
    email,
  );

  if (!email || !password) {
    return next({
      status: 401,
      message: 'All fields must be filled',
    });
  }

  if (!isEmailValid || password.length < 5) {
    return next({
      status: 401,
      message: 'Incorrect username or password',
    });
  }

  next();
};
