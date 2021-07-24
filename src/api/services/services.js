const errorHandling = (err, _req, res, _next) => {
  console.log(err);
  const result = res.status(err.status).json({ message: err.message });
  return result;
};

module.exports = {
  errorHandling,
};