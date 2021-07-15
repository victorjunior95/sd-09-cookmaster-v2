const { validateLogin } = require('./validations');

const login = async (user) => {
  const result = validateLogin(user);
  return result;
};

module.exports = {
  login,
};
