const usersService = require('../services/Users');

const CREATE_SUCCESS = 201;

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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { status, token } = await usersService.login({ email, password });
    // const verifyAccount = await usersService.login({ email, password });

    // res.status(verifyAccount.status).json({ verifyAccount.token });
    res.status(status).json({ token });
  } catch (error) {
    const data = JSON.parse(error.message);
    res.status(data.status).send({ message: data.message });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newAdmin = await usersService.registerAdmin({ name, email, password });

    const { password: pass, ...remnant } = newAdmin;
    res.status(CREATE_SUCCESS).json({ user: remnant });
  } catch (error) {
    console.error(error);

    const data = JSON.parse(error.message);
    res.status(data.status).json({ message: data.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  registerAdmin,
};
