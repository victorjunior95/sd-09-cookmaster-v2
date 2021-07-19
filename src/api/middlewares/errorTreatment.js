module.exports = (error, _req, res, _next) => {
  const { http = 500, message } = error;
  const body = { message };

  return res.status(http).json(body);
};
