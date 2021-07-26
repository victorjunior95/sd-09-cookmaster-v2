const userModel = require('../model/usersModel');

const addUser = async (user) => {
  const newUser = { ...user, role: 'user' };
  const { insertedId } = await userModel.create(user);
  newUser.id = insertedId;
  delete newUser.password;
  return newUser;
};

const addAdminUser = async (user) => {
  try {
    const newUser = { ...user, role: 'admin' };
    const { insertedId } = await userModel.create(newUser);
    newUser.id = insertedId;
    delete newUser.password;
    return newUser;
  } catch (error) {
    return (error);
  }
};

const getAllUsers = async () => {
  const usersList = await userModel.getAll();
  return usersList;
};

const findUserById = async (id) => {
  const user = await userModel.findById(id);
  return user;
};

const updateUser = async (id, user) => {
  const { matchedCount } = await userModel.update(id, user);
  return matchedCount;
};

const removeUser = async (id) => {
  const user = userModel.findById(id);
  await userModel.remove(id);
  return user;
};

module.exports = {
  addUser,
  addAdminUser,
  getAllUsers,
  findUserById,
  updateUser,
  removeUser,
};
