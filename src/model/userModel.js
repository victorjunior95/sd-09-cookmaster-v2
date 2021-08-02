const connect = require('../api/connect');

const USERS = 'users';

const createUser = async ({ name, email, password }) => {
try {
  const db = await connect();
  const result = await db.collection(USERS).insertOne({ name, email, password, role: 'user' });
  delete result.ops[0].password;
  return result.ops[0];
} catch (error) {
  return { error: error.message };
 }
};

const createAdmin = async ({ name, email, password }) => {
  try {
    const db = await connect();
    const result = await db.collection(USERS).insertOne({ name, email, password, role: 'admin' });
    delete result.ops[0].password;
    return result.ops[0];
  } catch (error) {
    return { error: error.message };
   }
  };
const findUser = async (data) => {
  try {
    const db = await connect();
    const result = await db.collection(USERS).findOne({ email: data });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { createUser, findUser, createAdmin };
