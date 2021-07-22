const { createUser, ValidLogin } = require('../services/users');

const CREATED = 201;
const SUCESS = 200;

const login = async (req, res) => {
    const { email, password } = req.body;
    const userLogin = await ValidLogin(email, password);
    return res.status(SUCESS).json({ token: userLogin });
  };

const create = async (req, res) => {
    const { name, email, password } = req.body;
    const result = await createUser(name, email, password);
    return res.status(CREATED).json({ user: 
      {
        name: result.name,
        email: result.email,
        role: result.role,
      } });
};

module.exports = {
  create,
  login,
};
