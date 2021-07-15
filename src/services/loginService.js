const loginValidation = require('../validations/loginValidation');
// verificar se o email e senha estao cadastrados no db
// caso esteja, montar um payload com id, email e role do user

// onde fazer isso tudo?
// acho que da pra fazer a verificacao no service
// e gerar o token em validations
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
