const {
  getUser,
} = require('../models/userModel');

const loginUser = async (email, password) => {
  const user = await getUser(email);

  if (!user) {
    return ({ err: { message: 'Incorrect username or password' } });
  }

  const match = await password === user.password;
  if (!match) {
    return ({ err: { message: 'Incorrect username or password' } });
  }

  if (user) {
    return (user);
  }
};

module.exports = loginUser;