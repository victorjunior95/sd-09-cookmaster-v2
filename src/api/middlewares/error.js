const errors = {
  invalidEntries: { code: 400, message: 'Invalid entries. Try again.' },
  existingEmail: { code: 409, message: 'Email already registered' },
};

module.exports = (err, _req, res, _next) => {
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
