const express = require('express');
const { createUserService } = require('../services/usersService');
const validateUsersInputToCreate = require('../middleware/validateUsersInputToCreate');

const UsersRouter = express.Router();

UsersRouter.post('/', validateUsersInputToCreate, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await createUserService(name, email, password);
        const newUser = {
            user,
        };
        res.status(201).json(newUser);
    } catch (err) {
        res.status(err.stateCode).json(err.message);
    }
});

module.exports = UsersRouter;
