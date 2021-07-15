
const { MongoClient } = require('mongodb');

const { MONGO_DB_URL } = process.env || 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports.connection = async (url = MONGO_DB_URL, dbName = DB_NAME) => {
  try {
    const conn = await MongoClient.connect(url, OPTIONS);
  
    const db = conn.db(dbName);

    return db;
  } catch (err) {
    return err.message;
  }
};
