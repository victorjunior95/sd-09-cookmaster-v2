const errors = {
  invalidEntries: { code: 400, message: 'Invalid entries. Try again.' },
  existingEmail: { code: 409, message: 'Email already registered' },
  emptyLoginFields: { code: 401, message: 'All fields must be filled' },
  invalidLoginData: { code: 401, message: 'Incorrect username or password' },
  missingToken: { code: 401, message: 'missing auth token' },
  invalidToken: { code: 401, message: 'jwt malformed' },
};

module.exports = async (err, _req, res, _next) => {
  const { error } = err;

  if (error) {
    const { code, message } = errors[error];
    return res.status(code).json({ message });
  }

  console.error(err);

  return res.status(500).json({
    error: {
      message: `Internal server error: ${err.message}`,
    },
  });
};
