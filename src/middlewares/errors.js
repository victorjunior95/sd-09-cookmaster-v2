const errors = {
  badRequest: { status: 400, message: 'Invalid entries. Try again.' },
  conflict: { status: 409, message: 'Email already registered' },
  missingFields: { status: 401, message: 'All fields must be filled' },
  invalidCredentials: { status: 401, message: 'Incorrect username or password' },
  jwtMalformed: { status: 401, message: 'jwt malformed' },
  recipeNotFound: { status: 404, message: 'recipe not found' },
  unauthorized: { status: 401, message: 'missing auth token' },
  forbidden: { status: 403, message: 'Only admins can register new admins' },
};

module.exports = ((err, _req, res, _next) => {
  const { status, message } = errors[err.code];
  if (err.isJoi) {
    return res.status(status).json({ message });
  }
  res.status(status).json({ message });
});
