const { validateRegex } = require('../schemas');

module.exports = (req, _res, next) => {
  const { name, email, password } = req.body;
  const isEmailValid = validateRegex(
    /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
    email,
  );

  if (!name || !email || !password || !isEmailValid) {
    return next({
      status: 400,
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};
