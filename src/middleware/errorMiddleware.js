module.exports = (err, req, res, _next) => {
  if (err.status) {
    console.log(err);
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};