const rescue = require('express-rescue');
const { newUserService, newAdminService } = require('../services/userServices');

const newUser = rescue(async (req, res, _next) => {
  const newUserData = req.body;

  const response = await newUserService(newUserData);
  if (response.error) return res.status(response.status).json({ message: response.message });
  return res.status(201).json(response);
});

const newAdminUser = rescue(async (req, res, _next) => {
  const token = req.headers.authorization;
  const newAdminData = req.body;

  const response = await newAdminService(newAdminData, token);
  if (response.error) return res.status(response.status).json({ message: response.error });

  return res.status(201).json(response);
});

module.exports = { newUser, newAdminUser };