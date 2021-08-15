/**
 * @typedef { import("express").Request } Request
 * @typedef { import("express").Response } Response
 */

/**
 * @param { Request } req
 * @param { Response } res
 */
async function createUser(req, res) {
    res.status(201).json({
        message: 'user created',
    });
}

module.exports = {
    createUser,
};
