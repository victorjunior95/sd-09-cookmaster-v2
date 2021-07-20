const jwt = require('jsonwebtoken');

const secret = 'segredao';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, secret);

    const { password: _, ...withoutPassword } = payload;

    req.user = withoutPassword;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { validateToken };
