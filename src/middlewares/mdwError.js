const genericError = ({ error }, _req, res, _next) => {
  const internalServerError = 500;
  const statusCode = error[0] || internalServerError;
  res.status(statusCode).json(error[1]);
};

module.exports = { genericError };
