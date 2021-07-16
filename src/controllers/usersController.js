const userServices = require('../services/userServices');

const postUserController = async (req, res) => {
  const { body } = req;

  const request = await userServices.postUserServices(body);

  res.status(request.status).json(request.response);
};

const loginController = async (req, res) => {
  const { body } = req;
  
  const request = await userServices.loginService(body);

  res.status(request.status).json(request.response);
};

module.exports = {
  postUserController,
  loginController,
};