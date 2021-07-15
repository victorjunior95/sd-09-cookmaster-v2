const genericError = (err, _req, res, _next) => {
  const internalServerError = 500;
  const { status } = err;
  const statusCode = status || internalServerError;
  res.status(statusCode).json(err);
};

module.exports = { genericError };
