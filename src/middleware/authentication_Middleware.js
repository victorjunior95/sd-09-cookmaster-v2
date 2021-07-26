const { validateToken } = require('../services');
const { INVALID_TOKEN } = require('../Messages/errors');

const authentication = async (token) => {
  const validate = await validateToken(token);
  if (validate === INVALID_TOKEN) return INVALID_TOKEN;
  const { _id } = validate;

  return _id;
};

module.exports = authentication;
