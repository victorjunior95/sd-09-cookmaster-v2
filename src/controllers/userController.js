/**
 * @typedef { import("express").Request } Request
 * @typedef { import("express").Response } Response
 */

const { userModel } = require('../models');
const { jwt } = require('../services');

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
    res.status(201).json({ user: {
        name: userCreated.name,
        email: userCreated.email,
        role: userCreated.role,
        _id: userCreated.id,
    } });
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function login(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user || user.password !== password) {
        res.status(401).json({
            message: 'Incorrect username or password',
        });
        return;
    }
    const token = jwt.generateJwt({ email, role: user.role, id: user.id });
    res.status(200).json({
        token,
    });
}

module.exports = {
    createUser,
    login,
};
