const loginValidation = require('../validations/loginValidation');

const authentication = async (email, password) => {
  if (!email || !password) {
    return {
      message: 'All fields must be filled',
      statusCode: 401,
    };
  }

  const user = await loginValidation.validateLogin(email, password);

  if (!user) {
    return {
      message: 'Incorrect username or password',
      statusCode: 401,
    };
  }

  const token = loginValidation.generateToken(user);

  return token;
};

module.exports = {
  authentication,
};
