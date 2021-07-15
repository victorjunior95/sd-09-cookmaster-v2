const { ObjectId } = require("mongodb");
const { connection } = require("./connection");

const postIntoDb = async (name, email, password, role = 'user') => {
  const db = await connection();

  const collection = await db.collection("users");

  const user = await collection.insertOne({ name, email, password, role });

  const _id = await user.insertedId;

  return user && { _id, name, email, role };
};

const getUserByEmailFromDb = async (email) => {
  const db = await connection();

  const collection = await db.collection("users");

  const findUserByEmail = await collection.findOne({ email });

  return findUserByEmail;
};

module.exports = {
  postIntoDb,
  getUserByEmailFromDb,
};
