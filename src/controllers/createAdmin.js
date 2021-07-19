const status = require('../api/status');
const verifyNewUser = require('../services/verifyNewUser');

module.exports = async (req, res, _next) => {
  const { user } = req;

  if (user.role === 'user') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  } 

  const data = await verifyNewUser(req.body, user.role);
  if (data.code === 'bad_request') return res.status(status.badRequest).json(data.err);
  if (data.code === 'conflict') return res.status(status.conflict).json(data.err);

  res.status(status.created).json({ user: data });
};