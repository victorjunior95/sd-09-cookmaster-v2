const validateUserInfos = (name, email, password) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const validateEmail = emailRegex.test(email);
  if (!name || !validateEmail || !password) {
    return {
      message: 'Invalid entries. Try again.',
    };
  }
};

module.exports = {
  validateUserInfos,
};
