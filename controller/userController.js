const service = require('../service/usersService');

const userRegister = async (req, res, next) => {
  try {
    const userData = await service.userRegisterService(req.body);
    if (userData.err) return res.json(404).json(userData);
    return res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
};