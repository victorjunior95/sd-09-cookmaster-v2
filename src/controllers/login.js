const rescue = require('express-rescue');

const createLogin = rescue(async (req, res, _next) => {
  const newLogin = req.body;
  return res.status(200).json(newLogin);
});

module.exports = {
  createLogin,
};