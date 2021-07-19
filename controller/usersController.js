const usersService = require('../service/usersService');

const postUser = async (req, res) => {
  const { name, email, password } = req.body;
  await usersService.newUser(name, email, password);
  console.log(typeof name);

  res.send('to aquiii');
};

module.exports = { postUser };
