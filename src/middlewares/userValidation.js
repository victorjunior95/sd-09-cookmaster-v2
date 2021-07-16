const errorObj = {
  code: 400,
  message: 'Invalid entries. Try again.',
};

const validateExistenceOfNameAndEmail = (name, email, password) => {
  if (!name || !email || !password) {
    throw errorObj;
  }
};

const validadeEmailFormat = (email) => {
  const emailRegex = /^.+@[a-z]+(\.[a-z]{2,3}){1,2}$/g;
  const emailTest = emailRegex.test(email);
  if (!emailTest) {
    throw errorObj;
  }
};

const userValidation = async (req, _res, next) => {
  const { name, email, password } = req.body;
  try {
    validateExistenceOfNameAndEmail(name, email, password);
    validadeEmailFormat(email);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userValidation;