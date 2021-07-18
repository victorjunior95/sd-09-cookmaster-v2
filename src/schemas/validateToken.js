const jwt = require('jsonwebtoken');

const usersModels = require('../models/usersModels');

const {
  SECRET,
  code: { UNAUTHORIZED },
  message: { JWT_MALFORMED, MISSING_AUTH_TOKEN },
} = require('../utils');

const getByEmailAndCompareId = async ({ email, _id: id }) => {
  const userGeted = await usersModels.getByEmail({ email });

  if (!userGeted) throw new Error();

  let { _id: userId } = userGeted;

  userId = JSON.stringify(userId);
  const idUserDecoded = JSON.stringify(id);

  if (userId !== idUserDecoded) return false;

  return userGeted;
};

const validateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(UNAUTHORIZED).json({ message: MISSING_AUTH_TOKEN });

  try {
    const userDecoded = jwt.verify(token, SECRET);

    const userGeted = await getByEmailAndCompareId(userDecoded);

    const { password, ...userWithoutPassword } = userGeted;

    req.user = userWithoutPassword;

    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: JWT_MALFORMED });
  }
};

module.exports = validateToken;
