const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URL = 'mongodb://localhost:27017/Cookmaster';

let db = null;

const connection = async () => {
  if (db) return Promise.resolve(db);

  const connect = await MongoClient.connect(MONGO_URL, OPTIONS);
  db = connect.db('Cookmaster');
  return db;
};

module.exports = connection;