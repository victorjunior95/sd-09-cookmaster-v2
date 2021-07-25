const usersModel = require('../models/usersModel');

const emailValidation = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/.test(email);
  const userEmail = await usersModel.getEmail(email);

  if (!userEmail) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (emailRegex === email) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  if (userEmail === email) {
    return res.status(400).json({ message: 'Email already registered' });
  }

};

module.exports = {
  emailValidation,
}