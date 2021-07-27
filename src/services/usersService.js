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

// const findUserById = async (id) => {
//   const user = await userModel.findById(id);
//   return user;
// };

module.exports = {
  addUser,
  addAdminUser,
};
