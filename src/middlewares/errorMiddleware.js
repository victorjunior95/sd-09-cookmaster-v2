const errorMessages = require('../services/utils/errorMessages');
const constants = require('../services/utils/constants');

const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);
  res.status(constants[err.code]).json({ message: errorMessages[err.message] });
};

module.exports = errorMiddleware;
