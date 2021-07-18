module.exports = (error, _req, res, _next) => {
  const { http = 500, message } = error;
  const body = { message };

  res.status(http).json(body);
};
