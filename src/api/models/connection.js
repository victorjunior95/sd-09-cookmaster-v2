const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.MONGO_URL || 'mongodb';
const DB_NAME = 'Cookmaster';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

module.exports = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(`mongodb://${MONGO_DB_URL}:27017/Cookmaster`, OPTIONS)
      .then((connection) => {
        db = connection.db(DB_NAME);
        return db;
      }));
