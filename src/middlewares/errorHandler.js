const StatusCode = require('../statusCode');

const errorHandler = (err, _req, res, _next) => {
  if (err.code) {
    return res.status(err.StatusCode).json({ message: err.message });
  }

  return res.status(StatusCode.internalServerError).json();
};

module.exports = errorHandler;
