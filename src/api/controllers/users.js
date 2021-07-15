const rescue = require('express-rescue');
const services = require('../services/users');
const { CREATED } = require('../constants/http.json');

const create = rescue(async (request, response, next) => {
  const { name, email, password, role } = request.body;
  const newUser = await services.create({ name, email, password, role });
  if (newUser.err) return next(newUser.err);
  response.status(CREATED).json({
    _id: newUser,
    name,
    email,
    password,
    role,
  });
});

module.exports = { create };
