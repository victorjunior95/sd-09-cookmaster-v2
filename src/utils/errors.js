const emptyValuesErr = {
  response: {
    message: 'Invalid entries. Try again.',
  },
  status: 400,
};

const emailExistErr = {
  response: { 
    message: 'Email already registered', 
  },
  status: 409,
};

const emptyFieldsErr = {
  response: { 
    message: 'All fields must be filled', 
  },
  status: 401,
};

const incorrectField = {
  response: { 
    message: 'Incorrect username or password', 
  },
  status: 401,
};

module.exports = {
  emptyValuesErr,
  emailExistErr,
  emptyFieldsErr,
  incorrectField,
};