const models = require('../models/usersModel');
const { validateEmail, emailExists } = require('../validations/emailValidation');

const validateNewUser = async (name, email, password) => {
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

  return await models.postIntoDb(name, email, password);
};

module.exports = {
  validateNewUser,
};
