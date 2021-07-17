const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const userServices = require('../services/userService');

const secret = 'mySecret';

const statusSucess = 200;

router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    const user = await userServices.login({ email, password });

    if (user.error) return next(user);

    const { _id, role } = user;
    const token = jwt.sign({ data: { id: _id, email, role } }, secret, jwtConfig);

    res.status(statusSucess).json({ token });
});

module.exports = router;