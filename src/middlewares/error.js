const getError = (err, _req, res, _next) => {
  console.log(err);
  if (err.status) {
    const { status, message } = err;
    return res.status(status).json({ message });
  }
  return res.status(500).json({
    error: {
      message: 'Internal server error',
    },
  });
};

module.exports = getError;
