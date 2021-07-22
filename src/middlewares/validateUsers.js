const usersModels = require('../models/users');

const emailExists = async (email) => {
    const user = await usersModels.findByEmail(email);
    if (user !== null) return true;
  return false;
};

const validateNamePass = async (req, res, next) => {
  const { name, password } = req.body;
  if (typeof name !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  if (!name || !password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const emailAlreadyExists = async (req, res, next) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const { email } = req.body;

  if (!email || !emailRegex.test(email)) { 
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
   }
  const emailUser = await emailExists(email);

  if (emailUser) return res.status(409).json({ message: 'Email already registered' });
  next();
  };

const isValidLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const userEmail = await usersModels.findByEmail(email);
  const userPassword = await usersModels.findByPassword(password);

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  if (!userEmail || !userPassword) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = { 
  validateNamePass,
emailAlreadyExists, 
isValidLogin };
