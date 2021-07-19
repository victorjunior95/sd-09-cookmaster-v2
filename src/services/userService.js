const userModel = require('../models/usersModel');
const { validateEmail, emailExists } = require('../validations/emailValidation');

const validateNewUser = async (name, email, password, userRole = 'user') => {
  const verifyEmail = validateEmail(email);
  const emailAlreadyExists = await emailExists(email);

  if (!name || !verifyEmail || !password) {
    return {
      statusCode: 400,
      message: 'Invalid entries. Try again.',
    };
  }

  if (emailAlreadyExists) {
    return {
      statusCode: 409,
      message: 'Email already registered',
    };
  }

  return userModel.postIntoDb(name, email, password, userRole);
};

module.exports = {
  validateNewUser,
};
