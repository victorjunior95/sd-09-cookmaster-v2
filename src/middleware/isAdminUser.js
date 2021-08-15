const jwt = require('jsonwebtoken');

const SECRET = 'essaédificil';

const isUserAdmin = (token, next) => {
    const payload = jwt.verify(token, SECRET);
    if (payload.role !== 'admin') {
        const err = new Error('Only admins can register new admins');
        err.statusCode = 403;
        return next(err);
    }
};

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        const err = new Error('missing auth token');
        err.statusCode = 401;
        return next(err);
    }
    try {
        isUserAdmin(token, next);
        return next();
    } catch (err) {
        err.statusCode = 401;
        err.message = 'jwt malformed';
        return next(err);
    }
};
