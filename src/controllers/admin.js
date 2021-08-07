const Admin = require('../services/admin');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const createAdmin = await Admin(req.body, authorization);

    return res.status(201).json({ user: { ...createAdmin } });
  } catch (error) {
    return next(error);
  }
};
