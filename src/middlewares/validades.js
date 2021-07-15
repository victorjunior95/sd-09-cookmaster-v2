const validadeValue = (value) => {
  if (!value) {
    return false;
  }

  return value;
};

const validadeEmail = (email) => {
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/;

  if (!email) return false;

  if (!regexEmail.test(email)) {
    return false;
  }

  return email;
};

const validadesUsers = (req, _res, next) => {
  const { name, email, password } = req.body;

  const isValidName = validadeValue(name);
  const isValidEmail = validadeEmail(email);
  const isValidPassword = validadeValue(password);

  if (!isValidName || !isValidEmail || !isValidPassword) {
    return next({ code: 400, message: 'Invalid entries. Try again.' });
  }

  return next();
};

const validadeLogin = (req, _res, next) => {
  const { email, password } = req.body;

  const isValidEmail = validadeValue(email);
  const isValidPassword = validadeValue(password);

  if (!isValidEmail || !isValidPassword) {
    return next({ code: 401, message: 'All fields must be filled' });
  }

  return next();
};

module.exports = {
  validadesUsers,
  validadeLogin,
};
