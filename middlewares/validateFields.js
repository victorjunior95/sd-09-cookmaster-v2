module.exports = (req, _res, next) => {
  const { name, email, password } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const isEmailValid = emailRegex.test(email);

  if (!name || !email || !password || !isEmailValid) {
    return next({
      status: 400,
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};
