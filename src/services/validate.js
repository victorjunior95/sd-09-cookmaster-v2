const validate = (name, email, password) => {
  if (!name || !email || !password) return false;

  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;
  if (!regexEmail.test(email)) return false;

  return true;
};

module.exports = validate;
