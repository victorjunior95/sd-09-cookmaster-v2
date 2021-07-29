const users = require('../services/users');

const create = async (req, res) => {
  const { body } = req;
  const response = await users.create(body);
  const { status, ...jsonResponse } = response;
  res.status(status).json(jsonResponse);
};

module.exports = { create };