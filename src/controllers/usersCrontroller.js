const usersModel = require('../models/usersModel');

const newUser = async (req, res) => {
    const { email, name, password } = req.body;
    const result = await usersModel.createUser(name, email, password);

    return res.status(201).json(result);
};

module.exports = {
    newUser,
};
