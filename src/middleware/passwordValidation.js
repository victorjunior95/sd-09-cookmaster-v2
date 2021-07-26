const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  console.log('Valida senha');
  if (!password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = passwordValidation;