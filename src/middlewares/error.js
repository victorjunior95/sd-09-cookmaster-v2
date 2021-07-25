const erro = 500;

module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(err.statusCode || erro).json({ message: err.message });
};