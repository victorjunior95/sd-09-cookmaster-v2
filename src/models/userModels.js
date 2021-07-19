const jwt = require('jsonwebtoken');
const connection = require('./connection');

const DB_COLLECTION = 'users';

const SECRET = 'cookMaster';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const findUserByEmail = async (data) => {
  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION).findOne({ email: data }));

  return request;
};

const postUserModel = async (data) => {
  const request = await connection().then((db) =>
    db.collection(DB_COLLECTION).insertOne({ ...data, role: 'user' }));
  const { password, ...userData } = request.ops[0];
  return { user: { ...userData } };
};

const loginModel = async (data) => {
  const tokenData = await jwt.sign(data, SECRET, jwtConfig);
  return { token: tokenData };
};

const createAdminModel = async (data) => {
  const request = await connection().then((db) =>
    db.collection(DB_COLLECTION).insertOne({ ...data, role: 'admin' }));
  const { password, ...userData } = request.ops[0];
  return { user: { ...userData } };
};

module.exports = {
  postUserModel,
  findUserByEmail,
  loginModel,
  createAdminModel,
};
