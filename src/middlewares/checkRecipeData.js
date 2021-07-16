const checkRecipeData = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const BAD_REQUEST = 400;

  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
};

module.exports = checkRecipeData;