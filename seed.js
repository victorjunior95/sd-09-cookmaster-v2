// colocar query do MongoDB

const userModel = require('./src/models/usersModel');

const adminData = {
  name: 'admin',
  email: 'root@email.com',
  password: 'admin',
  role: 'admin'
};

const createUserAdmin = async (adminData) => {
  try {
    await userModel.createUserAdmin(adminData);
  } catch (err) {
    console.log(`[Seed error] > ${err.message}`);
  }
}

createUserAdmin(adminData);
