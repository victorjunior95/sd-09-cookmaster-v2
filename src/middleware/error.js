module.exports = (err, _req, res, _next) => {
  const { status, message } = err;

  if (!status) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  return res.status(status).json({ message });
};