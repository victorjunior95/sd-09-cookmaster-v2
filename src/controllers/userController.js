const userService = require('../services/usersService');
const httpStatus = require('./httpStatus');
 
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userEmail = await userService.getUserByEmail(email);

  if (userEmail) {
    return res.status(httpStatus.CONFLICT).json({ message: 'Email already registered' });
  }

  const user = await userService.createUser(name, email, password);

  if (user.message) {
    return res.status(httpStatus.BAD_REQUEST).json(user);
  }

  return res.status(httpStatus.CREATED).json(user);
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const userEmail = await userService.userLogin(email, password);

    if (userEmail.message) {
      return res.status(httpStatus.UNAUTHORIZED).json(userEmail);
    }

  return res.status(httpStatus.OK).json(userEmail);
};

module.exports = {
  createUser,
  userLogin,
};