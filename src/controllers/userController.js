/**
 * @typedef { import("express").Request } Request
 * @typedef { import("express").Response } Response
 */

const { userModel } = require('../models');

/**
 * @param { Request } req
 * @param { Response } res
 */
async function createUser(req, res) {
    const { name, email, password } = req.body;
    const userWithSameEmail = await userModel.findByEmail(email);
    if (userWithSameEmail) {
        res.status(409).json({ message: 'Email already registered' });
        return;
    }
    const userCreated = await userModel.create({ name, email, password, role: 'user' });
    res.status(201).json({ user: userCreated });
}

module.exports = {
    createUser,
};
