const { findUserByEmail } = require('../models/UsersModel');

const verifyEmailAndPassword = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  next();
};

const isValidEmailOrPassword = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (user === null) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = {
  verifyEmailAndPassword,
  isValidEmailOrPassword,
};