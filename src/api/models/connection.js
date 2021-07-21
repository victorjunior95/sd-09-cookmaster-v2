const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Para o avaliador funcionar altere a conexão do banco para:

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let db = null;

const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
        db = conn.db(DB_NAME);
        return db;
    })
    .catch((err) => {
        console.error(err);
        process.exit();
    }));  

module.exports = connection;