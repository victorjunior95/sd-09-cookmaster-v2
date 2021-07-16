const checkUserData = (name, email, password) => {
  const emailIsValid = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const testEmail = emailIsValid.test(email);

  if (!name || !email || !testEmail || !password) {
    return {
      message: 'Invalid entries. Try again.',
    };
  }
};

module.exports = checkUserData;