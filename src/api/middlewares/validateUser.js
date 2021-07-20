const error = {
  invalid: 'Invalid entries. Try again.',
  notEmpty: 'All fields must be filled',
};

const status = {
  badRequest: 400,
  unauthorizes: 401,
};

const nameIsValid = async (name) => {
  if (!name) return false;
  return true;
};

const emailIsValid = async (email) => {
  const emailRgx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email || !emailRgx.test(email)) return false;
  return true;
};

const passwordIsValid = async (password) => {
  if (!password) return false;
  return true;
};

const validateUser = async (name, email, password) => {
  const validName = await nameIsValid(name);
  const validEmail = await emailIsValid(email);
  const validPassword = await passwordIsValid(password);

  if (!validName || !validEmail || !validPassword) {
    return { isError: true,
      message: error.invalid,
      status: status.badRequest,
    };
  }

  return true;
};

module.exports = {
  validateUser,
};