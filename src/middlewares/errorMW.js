const apiError = (error, _req, res, _next) => (
  res.status(error.errorCode).json({ message: error.message })
);

module.exports = apiError;
