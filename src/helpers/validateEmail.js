const validateEmail = (email) => {
  const emailPattern = /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm;
  return email && emailPattern.test(email);
};

module.exports = validateEmail;