const model = require('../models/users');

const loginUser = async (email, password) => {
    const user = await model.getUser(email);
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