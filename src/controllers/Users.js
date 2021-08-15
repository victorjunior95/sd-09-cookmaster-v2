const usersService = require('../services/Users');

const CREATE_SUCCESS = 201;
// const NOT_SUCCESS = 400;

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await usersService.register({ name, email, password });

    const { password: pass, ...remnant } = newUser;
    res.status(CREATE_SUCCESS).json({ user: remnant });
  } catch (error) {
    console.error(error);

    const data = JSON.parse(error.message);
    res.status(data.status).json({ message: data.message });
  }
};

module.exports = {
  registerUser,
};
