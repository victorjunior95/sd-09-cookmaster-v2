const service = require('../service/usersService');

const userRegister = async (req, res, next) => {
  try {
    const userData = await service.userRegisterService(req.body);
    if (userData.err) return res.status(404).json(userData);
    return res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const result = await service.loginService(req.body);
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
};
