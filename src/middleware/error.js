const SERVER_ERROR_MESSAGE = 'Internal server error';

/**
 * Module that exports the correct message according the given status
 */
const errorMiddleware = (err, _req, res, _next) => {
  const { status, message } = err;

  return status
    ? res.status(status).json({ message })
    : res.status(500).json({ message: SERVER_ERROR_MESSAGE });
};

module.exports = errorMiddleware;