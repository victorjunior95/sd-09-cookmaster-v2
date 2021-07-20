const UsersModel = require('./usersModel');

const create = async ({ name, email, password, role = 'user' }) => {
  const existingEmail = await UsersModel.findByQuery({ email });

  if (existingEmail) return { error: 'existingEmail' };

  const { ops: [newUserEntry] } = await UsersModel.create({ name, email, password, role });
  const { password: _, ...newUserData } = newUserEntry;
  return newUserData;
};

module.exports = {
  create,
};
