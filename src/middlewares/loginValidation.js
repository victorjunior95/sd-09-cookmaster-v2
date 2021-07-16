const validateExistenceOfEmailAndPassword = (email, password) => {
  if (!email || !password) {
    const errorObj = {
      code: 401,
      message: 'All fields must be filled',
    };
    throw errorObj;
  }
};

const validadeEmailFormat = (email) => {
  const emailRegex = /^.+@[a-z]+(\.[a-z]{2,3}){1,2}$/g;
  const emailTest = emailRegex.test(email);
  if (!emailTest) {
    const errorObj = {
      code: 401,
      message: 'Incorrect username or password',
    };
    throw errorObj;
  }
};

const loginValidation = async (req, _res, next) => {
  const { email, password } = req.body;
  try {
    validateExistenceOfEmailAndPassword(email, password);
    validadeEmailFormat(email);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = loginValidation;