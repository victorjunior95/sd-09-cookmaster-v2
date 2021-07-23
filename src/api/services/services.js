const errorHandling = (err, _req, res, _next) => {
  const result = res.status(err.status).json({ message: err.message });
  return result;
};

module.exports = {
  errorHandling,
};