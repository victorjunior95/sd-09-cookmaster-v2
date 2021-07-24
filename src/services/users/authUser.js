const jwt = require('jsonwebtoken');
const userExists = require('../utils/userExists');

const secret = 'cookmastertoken';

const authUser = async (token) => {
  try {
    const decode = jwt.verify(token, secret);
    
    const user = await userExists('email', decode.email);

    if (!user) {
      return { error: true, code: 'STATUS_NOT_FOUND', message: 'notFoundUser' };
    }

    return user;
  } catch (err) {
    return { error: true, code: 'STATUS_UNAUTHORIZED', message: 'badJWT' };
  }
};

const admin = async (token) => {
  try {
    const decode = jwt.verify(token, secret);
    
    const user = await userExists('email', decode.email);

    if (!user) {
      return { error: true, code: 'STATUS_NOT_FOUND', message: 'notFoundUser' };
    }

    if (user.role !== 'admin') {
      return { error: true, code: 'STATUS_FORBIDDEN', message: 'onlyAdmin' };
    }

    return user;
  } catch (err) {
    return { error: true, code: 'STATUS_UNAUTHORIZED', message: 'badJWT' };
  }
};

module.exports = {
  authUser,
  admin,
};
