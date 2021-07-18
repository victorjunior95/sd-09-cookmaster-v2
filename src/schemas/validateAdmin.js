const {
  code: { FORBIDDEN },
  message: { ONLY_ADMIN },
} = require('../utils');

const validateAdmin = (req, res, next) => {
  const { role } = req.user;
  console.log('========USER======', role, role === 'admin');

  if (role !== 'admin') return res.status(FORBIDDEN).json({ message: ONLY_ADMIN });
  console.log('========USER======2', role, role === 'admin');

  next();
};

module.exports = validateAdmin;
