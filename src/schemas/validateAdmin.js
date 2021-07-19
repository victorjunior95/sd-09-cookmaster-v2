const {
  code: { FORBIDDEN },
  message: { ONLY_ADMIN },
} = require('../utils');

const validateAdmin = (req, res, next) => {
  const { role } = req.user;

  if (role !== 'admin') return res.status(FORBIDDEN).json({ message: ONLY_ADMIN });

  next();
};

module.exports = validateAdmin;
