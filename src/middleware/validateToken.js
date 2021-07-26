const jwt = require('jsonwebtoken');

const SECRET = 'essaédificil'

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        const err = new Error('missing auth token');
        err.statusCode = 401;
        return next(err)
    }

    try {
        const payload = jwt.verify(token, SECRET)
        req.user = payload
        return next()
    } catch (err) {
        err.statusCode = 401
        err.message = "jwt malformed"
        return next(err)
    }
}
