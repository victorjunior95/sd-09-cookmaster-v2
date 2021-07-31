const rescue = require('express-rescue');
const { newUserService } = require('../services/userServices');

const newUser = rescue(async (req, res, _next) => {
  const newUserData = req.body;

  const response = await newUserService(newUserData);
  console.log(response);
  if (response.error) return res.status(response.status).json({ message: response.message });
  return res.status(201).json(response);
});

module.exports = { newUser };