const connection = require('./connection');

const users = 'users';

const addUser = async ({ name, password, email, role }) => {
  const db = await connection();
  const response = await db.collection(users).insertOne({ name, password, email, role });
  const { password: pass, ...responseWithoutPassword } = response.ops[0];
  return { user: responseWithoutPassword };
};

const findByEmail = async (email) => {
  const db = await connection();
  const response = await db.collection(users).find({ email }).toArray();
  return response;
};

module.exports = {
  addUser,
  findByEmail,
};
