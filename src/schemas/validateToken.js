const jwt = require('jsonwebtoken');

const usersModels = require('../models/usersModels');

const {
  SECRET,
  code: { UNAUTHORIZED },
  message: { JWT_MALFORMED, MISSING_AUTH_TOKEN },
} = require('../utils');

const getByEmailAndCompareId = async ({ email, _id: id }) => {
  const userGeted = await usersModels.getByEmail({ email });
  if (!userGeted) return false;

  const { _id: userId } = userGeted;

  if ((JSON.stringify(userId) !== JSON.stringify(id))) return false;

  return userGeted;
};

const validateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(UNAUTHORIZED).json({ message: MISSING_AUTH_TOKEN });

  try {
    const userDecoded = jwt.verify(token, SECRET);

    const user = await getByEmailAndCompareId(userDecoded);

    if (!user) throw new Error();

    req.user = user;

    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: JWT_MALFORMED });
  }
};

module.exports = validateToken;
