const { getUserByEmail, getUserByPassword } = require('../../models/users');

const validateLoginData = (email, password) => {
  if (!email || !password) {
    return {
      message: 'All fields must be filled',
    };
  }
};

const validateCompatibleLoginData = async (email, password) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const validateEmail = emailRegex.test(email);
  const emailFromDB = await getUserByEmail(email);
  const passwordFromDB = await getUserByPassword(password);
  if (!emailFromDB || !passwordFromDB || !validateEmail) {
    return {
      message: 'Incorrect username or password',
    };
  }
};

module.exports = {
  validateLoginData,
  validateCompatibleLoginData,
};
