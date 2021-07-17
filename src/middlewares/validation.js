const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'mySecret';

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return { error: 'missing auth token', status: 401 };

    try {
        const payload = jwt.verify(token, secret);
        const user = await userModel.getUserByEmail(payload.data.email);
        if (!user) return { error: 'jwt malformed', status: 401 };
        req.userId = payload.data.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};