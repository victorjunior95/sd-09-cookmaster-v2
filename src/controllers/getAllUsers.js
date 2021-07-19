const { listAllUsers } = require('../Models/users');

module.exports = async (_req, res, _next) => {
  try {
    const data = await listAllUsers();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
