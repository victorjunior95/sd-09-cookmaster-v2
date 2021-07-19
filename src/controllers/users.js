const services = require('../services/users');

const CREATED = '201';

const createUser = async (req, res) => {
  const { name, password, email } = req.body;
    const user = await services.createUser(name, email, password);
    if (user.err) {
      return res.status(user.err.error).send({ message: user.err.message });
    }
      return res.status(CREATED).json({ user });
};

module.exports = {
  createUser,
};