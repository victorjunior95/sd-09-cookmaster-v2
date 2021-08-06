// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createItem = async (dataObj, collection) => {
  const connect = await connection();
  const insertedItem = connect.collection(collection).insertOne(dataObj);

  return insertedItem;
};

const searchEmail = async (email, collection) => {
  const connect = await connection();
  const searchResult = connect.collection(collection).findOne({ email: { $eq: email } });

  return searchResult;
};

module.exports = {
  createItem,
  searchEmail,
};
