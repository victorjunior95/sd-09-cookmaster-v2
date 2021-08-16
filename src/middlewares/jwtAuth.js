const { userModel } = require('../models');
const { jwt } = require('../services');

async function jwtAuth(req, res, next) {
    const { authorization } = req.headers;
    const { email, error } = jwt.verifyJwt(authorization);
    if (error) {
        res.status(401).json({ message: 'jwt malformed' });
        return;
    }
    req.user = await userModel.findByEmail(email);
    next();
}

module.exports = jwtAuth;