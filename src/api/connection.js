const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/Cookmaster';
const DB_NAME = 'Cookmaster';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db;

const connection = async () => (db ? Promise.resolve(db) : MongoClient
  .connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit();
    }));

module.exports = connection;
