const MISSING_FIELDS = {
  status: 401,
  error: {
    message: 'All fields must be filled',
  },
};

const INVALID_CREDENTIALS = {
  status: 401,
  error: {
    message: 'Incorrect username or password',
  },
};

function validateFields(email, password) {
  if (!email || !password) throw MISSING_FIELDS;
}

function validateCredentials(user, password) {
  if (!user || user.password !== password) throw INVALID_CREDENTIALS;
}

module.exports = {
  validateFields,
  validateCredentials,
};
