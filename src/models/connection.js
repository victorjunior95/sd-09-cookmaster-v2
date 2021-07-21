const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// local
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster' || 'mongodb://mongodb:27017/Cookmaster';

// evaluator
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';
let db = null;
const connection = () => (
  db ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      db = conn.db(DB_NAME);
      return db;
  })
);
module.exports = connection;
