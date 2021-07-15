const mongoClient = require('mongodb').MongoClient;
// A conexão do banco local deverá conter os seguintes parâmetros:

// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

// Para o avaliador funcionar altere a conexão do banco para:

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection; 