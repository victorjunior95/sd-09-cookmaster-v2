const USER = require('../models/users');

const userAdmin = {
  name: 'admin',
  email: 'root@email.com',
  password: 'admin',
  role: 'admin'
};

const createUser = async (userAdmin) => {
  const {name, email, password, role} = userAdmin;
  const addUser = await User.create(name, email, password, role);
  if (!addUser) {
    return 'Seed error';
  } 
  return true;
}

createUser(userAdmin);