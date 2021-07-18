const rescue = require('express-rescue');

const createUser = rescue(async (req, res, _next) => {
  const newUser = req.body;
  return res.status(200).json(newUser);
});

module.exports = {
  createUser,
};