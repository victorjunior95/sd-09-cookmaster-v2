const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017';
const DB_NAME = 'Cookmaster';

let db = null;

const connection = () => (
  db ? Promise.resolve(db)
    : MongoClient.connect(process.env.MONGO_DB_URL || MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db(DB_NAME);
        return true;
      })
);

module.exports = connection;