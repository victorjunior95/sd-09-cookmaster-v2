const userService = require('../service/user');

const insertUserController = async (request, response) => {
  const newUser = request.body;
  const { status, createUser } = await userService.insertUserService(newUser);
  response.status(status).json({ user: createUser });
};

module.exports = {
  insertUserController,
};

  // console.log(newUser); /* { name: 'teste1', email: 'teste1@gmail.com', password: 'teste' } */