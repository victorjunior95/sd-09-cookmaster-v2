const jwt = require('jsonwebtoken');
const {
  findUserbyname,
} = require('../../models/usersModel');

const cdi = 401;
const cd = 400;
const secret = 'cookMaster';

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
 return res.status(cdi).json({ message: 'missing auth token' });
}
 const token = req.headers.authorization;
 if (!token) {
    return res.status(cdi).json({ message: 'jwt malformed' });
  }
try {
  const decoded = jwt.verify(token, secret);
  const user = await findUserbyname(decoded.name);
  if (!user) {
      return res
        .status(cd)
        .json({ message: 'jwt malformed' });
    }
    req.user = user;
    next();
  } catch (err) { return res.status(cdi).json({ message: err.message }); }
};