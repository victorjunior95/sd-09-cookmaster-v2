const { createUser } = require('../services/users');

const CREATED = 201;

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
};
