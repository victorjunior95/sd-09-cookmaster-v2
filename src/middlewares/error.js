const HTTP_INTERNAL_ERROR_STATUS = 500;

const error = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);

  return res.status(HTTP_INTERNAL_ERROR_STATUS).json({
    message: `Internal server error: ${err.message}`,
  });
};

module.exports = error;
