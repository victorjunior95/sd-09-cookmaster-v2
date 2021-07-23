const validateError = (status, message) => ({
  status,
  message,
});

const errorMidd = (error, _req, res, _next) => {
  if (error.status) {
    const { status, message } = error;
    return res.status(status).json({ message });
  }

  return res.status(500).json({
    code: 'internal',
    message: 'Internal server error',
  });
};

module.exports = {
  validateError,
  errorMidd,
};