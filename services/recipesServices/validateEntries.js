const badRequest = 400;

const validateEntries = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(badRequest).json({ message: 'Invalid entries. Try again.' });
  }
  return next();
};

module.exports = validateEntries;
