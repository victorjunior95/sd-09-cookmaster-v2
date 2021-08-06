const services = require('../services');

const userController = async (req, res, next) => {
  const data = req.body;
  const collection = 'users';

  try {
    const userWithPass = await services.validateUserData(data, collection);
    const { password, ...remainingData } = userWithPass;
    const user = remainingData;

    return res.status(201).json({ user });
  } catch (err) {
    return next(err);
  }
}; 

module.exports = {
  userController,
};
