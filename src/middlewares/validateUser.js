const userSchema = require('../schemas/userSchema');

const validateUser = async (req, res, next) => {
  const userData = req.body;
  const error = await userSchema.validateUserData(userData);
  if (error) {
    return res.status(error.response).json({ message: error.message });
  }
  next();
};
module.exports = {
  validateUser,
};
