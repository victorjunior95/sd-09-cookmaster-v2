const preparationValidation = (req, res, next) => {
  const { preparation } = req.body;
  if (!preparation) return res.status(400).json({ message: 'Invalid entries. Try again.' });
};

module.exports = preparationValidation;
