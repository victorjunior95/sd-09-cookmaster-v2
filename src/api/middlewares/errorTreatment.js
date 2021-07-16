const errors = require('../errors');

module.exports = (error, _req, res, _next) => {
  const body = { message: error.message };
  switch (error.constructor) {
    case errors.InvalidArgumentError:
      return res.status(400).json(body);
    case errors.ConflictError:
      return res.status(409).json(body);
    case errors.AccessError:
      return res.status(401).json(body);
    default:
      return res.status(500).json(body);
  }
};
