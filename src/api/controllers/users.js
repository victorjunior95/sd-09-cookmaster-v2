const rescue = require('express-rescue');
const service = require('../services/users');
const { CREATED } = require('../constants/http.json');

const create = rescue(async (request, response, next) => {
  const { name, email, password, role = 'user' } = request.body;
  const newUser = await service.create({ name, email, password, role });
  if (newUser.err) return next(newUser.err);
  const { _id } = newUser;
  response.status(CREATED).json({
    user: {
      _id,
      name,
      email,
      role,
    },
  });
});

module.exports = { create };
