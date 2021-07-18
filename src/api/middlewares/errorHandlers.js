const httpStatusCode = require('../utils/httpStatusCodes');

const errorHandler = (err, _req, res, next) => {
  if (err.code) {
    const { code, message } = err;
    return res.status(httpStatusCode[code]).json({ message });
  }

  next(err);
};

const serverErrorHandler = (err, _req, res, _next) => {
  console.log(err);

  return res.status(httpStatusCode.internalServerError).json({
      message: 'Oooops D:', 
  });
};

module.exports = { errorHandler, serverErrorHandler };
