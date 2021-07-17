const express = require('express');

const router = express.Router();
const userService = require('../services/userService');

const statusSucessCreate = 201;

router.post('/', async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await userService.create({ name, email, password, role: 'user' });

    if (user.error) return next(user);

    res.status(statusSucessCreate).json({ user: { _id: user.id, name, email, role: 'user' } });
});

module.exports = router;