const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';
let db = null;

function connection() {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(process.env.MONGO_DB_URL || MONGO_DB_URL, OPTIONS).then(
      (conn) => {
        db = conn.db(process.env.DB_NAME || DB_NAME);
        return db;
      },
    );
}
module.exports = connection;