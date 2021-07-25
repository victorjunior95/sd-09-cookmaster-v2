// const statusCode = {
//   OK: 200,
//   CREATED: 201,
//   NO_CONTENT: 204,
//   INVALID_DATA: 400,
//   UNAUTHORIZED: 401,
//   FORBIDDEN: 403,
//   NOT_FOUND: 404,
//   EMAIL_ALREADY_EXIST: 409,
// };

module.exports = (err, _req, res, _next) => {
  const { status, message } = err;
  if (!status) return res.status(500).json({ message: 'Internal server error' });
  return res.status(status).json({ message });
};