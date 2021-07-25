const badRequest = 400;

const validateEntries = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(badRequest).json({ message: 'Invalid entries. Try again.' });
  }
  console.log('CHEGUEI AQUI');
  return next();
};

module.exports = validateEntries;
