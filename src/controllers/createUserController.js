const {
    createUserService,
} = require('../services/createUserService');

const createUserController = async (req, res, next) => {
    try {
        const { name, email, password, role = 'user' } = req.body;
        const userCreated = await createUserService({ name, email, password, role });
        return res.status(201).json(userCreated);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    createUserController,
};