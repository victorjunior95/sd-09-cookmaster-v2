const { EMAIL_ALREADY_EXISTS } = require('../Messages/errors');

const { findEmail } = require('../models');

const searchEmail = async (email) => {
  const result = await findEmail(email);
  if (!result) return true;

  return EMAIL_ALREADY_EXISTS;
};

module.exports = searchEmail;
