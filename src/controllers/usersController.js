const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  const user = req.body;

  const registrationResult = await usersService.createUser(user);

  return res.status(registrationResult.status).json({
    user: registrationResult.result
  });
}

module.exports = {
  createUser,
};
