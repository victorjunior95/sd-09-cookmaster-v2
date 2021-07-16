const verifyEntries = require('../schemas/verifyEntries');
const users = require('../Models/users');

module.exports = async (body) => {
  const { name, email, password } = body;

  const validate = verifyEntries(body);
  if (validate.err) return validate;

  const findedUser = await users.findUserByEmail(email);
  if (findedUser) {
    return { code: 'conflict', err: { message: 'Email already registered' } };
  } 

  const data = await users.createUser(name, email, password);

  return data;
};
