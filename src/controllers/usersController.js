const usersService = require('../services/usersService');

const createUser = async (req, res, next) => {
  try {
    const user = req.body;

    const registrationResult = await usersService.createUser(user);

    // if (registrationResult.message) return next()

    return res.status(registrationResult.status).json({
      user: registrationResult.result
    });
  } catch (err) {
    console.log('Error user Controller: ', err.message);
    return next(err);
  }
}

module.exports = {
  createUser,
};
