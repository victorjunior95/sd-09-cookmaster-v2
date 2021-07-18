const userServices = require('../Services/user');

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userServices.addUser(name, email, password);
    if (user !== null && user !== undefined) {
        return res.status(200).json({ user });
      }
};

module.exports = {
    addUser,
};