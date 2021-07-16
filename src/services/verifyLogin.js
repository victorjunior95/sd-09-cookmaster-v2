const users = require('../Models/users');

module.exports = async (body) => {
  const { email, password } = body;
  if (!email || !password) {
    return { code: 'login_not_found', err: { message: 'All fields must be filled' } };
  }

  const data = await users.findUser(email, password);
  if (!data) {
    return { code: 'unauthorized', err: { message: 'Incorrect username or password' } };
  }
  
  return data;
};
