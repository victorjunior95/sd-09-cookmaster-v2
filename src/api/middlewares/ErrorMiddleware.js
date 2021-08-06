const statusCode = (typeMsg) => {
  switch (typeMsg) {
    case 'emailTaken':
      return 409;
    default:
      return 400;
  }
};

const ERROR_MIDDLEWARE = (err, _req, res, _next) => {
  const { details: [{ message, type }] } = err;
  const status = statusCode(type);
  
  console.log(err);

  return res.status(status).json({ message });
};

module.exports = ERROR_MIDDLEWARE;
