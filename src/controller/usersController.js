const UsersService = require('../services/userServices');

const CREATED = 201;
const ERROR = 500;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await UsersService.createUser(name, email, password);
    const { password: pass, ...userInfo } = newUser.ops[0];
    return res.status(CREATED).json({ user: userInfo });
  } catch (err) {
    res.status(ERROR).json(err);
  }
};

module.exports = {
  createUser,
};