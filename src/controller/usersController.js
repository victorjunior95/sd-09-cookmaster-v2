const userServices = require('../services/userServices');

const CREATED = 201;
const ERROR = 500;

const creteUSers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userServices.createUsers(name, email, password);
    const { password: pass, ...users } = newUser.ops[0];
    return res.status(CREATED).json({ user: users });
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

module.exports = {
    creteUSers,
};