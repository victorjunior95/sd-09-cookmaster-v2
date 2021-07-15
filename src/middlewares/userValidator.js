const { findUserByEmail } = require('../models/UsersModel');

function isValidEmail(email) {
  const regexValEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regexValEmail.test(email);
}

async function userExists(email) {
  const user = await findUserByEmail(email);
  if (user !== null) return true;
  return false;
}

const validateNameAndPass = (req, res, next) => {
  const { name, password, email } = req.body;
  const emailValidate = isValidEmail(email);
  
  if (!name || !password || !email || !emailValidate) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const emailAlreadyExists = async (req, res, next) => {
  const { email } = req.body;
  const emailExists = await userExists(email);

  if (emailExists) return res.status(409).json({ message: 'Email already registered' });
  next();
};

module.exports = {
  validateNameAndPass,
  emailAlreadyExists,
};