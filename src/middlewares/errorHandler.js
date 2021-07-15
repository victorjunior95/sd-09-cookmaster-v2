const httpCodes = require('../auxiliarFunctions/httpCodes');

const errorMiddleware = (err, req, res, _next) => {
  if (err.isJoi) {
    return res.status(httpCodes.invalidData)
      .json({ 
        message: 'Invalid entries. Try again.',
      });
  }

  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }

  res.status(httpCodes.internalServerError)
    .json({ error: { code: 'internal', message: 'Internal server error' } });
};

module.exports = errorMiddleware;