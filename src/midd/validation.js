const jwt = require('jsonwebtoken');

const secret = 'tokensupersecreto';
/* const token = 'token nargas' */
const dataErr = require('../helpers/index');

const RecipVal = async (req, res, next) => {
  const reqToken = req.headers.authorization;
  if (!reqToken) {
    next(dataErr(401, 'missing auth token'));
  }
  try {
    const decd = jwt.verify(reqToken, secret);
    console.log(decd);
    const { _id: id } = decd;
    console.log(id);
    req.userId = id;
  } catch (_err) {
    next(dataErr(401, 'jwt malformed'));
  }
  next();
};

module.exports = {
  RecipVal,
};
