const httpCodes = require('../auxiliarFunctions/httpCodes');

const errorMiddleware = (err, req, res, _next) => {
  if (err.isJoi) {
    return res.status(err.details[0].code)
      .json({ 
        message: err.details[0].message,
      });
  }

  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }

  res.status(httpCodes.internalServerError)
    .json({ error: { code: 'internal', message: 'Internal server error' } });
};

module.exports = errorMiddleware;