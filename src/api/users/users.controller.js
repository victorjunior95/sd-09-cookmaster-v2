const usersService = require('./users.service');

const createUser = async (req, res) => {
  try {
    const { status, data } = await usersService.createUser(req.body);

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const createAdmin = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { status, data } = await usersService.createAdmin(req.body, authorization);

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

module.exports = {
  createUser,
  createAdmin,
};
