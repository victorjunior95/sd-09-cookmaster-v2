const SERVER_ERROR_MESSAGE = 'Internal server error';

/**
 * Module that exports the correct message according the given status
 */
 const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  console.log(err.message);
  return res.status(500).json({
    error: {
      message: SERVER_ERROR_MESSAGE,
    },
  });
};

module.exports = errorMiddleware;