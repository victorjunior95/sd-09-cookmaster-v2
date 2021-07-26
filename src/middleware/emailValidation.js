const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/;
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
}

  next();
};

module.exports = emailValidation;
