const { validateNewUser, insertNewUser } = require('../services');

const createUser = async (req, res) => {
  const { email, name, password } = req.body;

  const newUser = {
    email,
    name,
    password,
  };

  const userResult = await validateNewUser(newUser);
  if (userResult !== true) {
    const { code, message } = userResult;
    return res.status(code).json({ message });
  }

  const { code, user } = await insertNewUser(email, name, password);
  
  return res.status(code).json({ user });
};

module.exports = createUser;
