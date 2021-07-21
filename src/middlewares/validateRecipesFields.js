module.exports = (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return next({
      status: 400,
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};
