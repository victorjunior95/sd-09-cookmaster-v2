const Services = require('../services/users');

const create = async (req, res) => {
  const { body } = req;
  const { status, ...jsonResponse } = await Services.create(body);
  res.status(status).json(jsonResponse);
};

const login = async (req, res) => {
  const { body } = req;
  const { status, ...jsonResponse } = await Services.login(body);
  res.status(status).json(jsonResponse);
};

const createAdmin = async (req, res) => {
  const { body } = req;
  const { status, ...jsonResponse } = await Services.create(body, 'admin');
  res.status(status).json(jsonResponse);
};

module.exports = { 
  create, 
  login, 
  createAdmin, 
};