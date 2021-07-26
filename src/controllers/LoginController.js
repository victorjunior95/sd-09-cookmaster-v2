const express = require('express');
const validateLogin = require('../middleware/validateLogin');
const { LoginService } = require('../services/loginService');

const LoginRouter = express.Router();

LoginRouter.post('/', validateLogin, async (req, res) => {
    const { email } = req.body;
    try {
        const token = await LoginService(email);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = LoginRouter;
