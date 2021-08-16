const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

let connectionMock;
const DBServer = new MongoMemoryServer();

const getConnection = async () => {
  const URLMock = await DBServer.getUri();
  const OPTION = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return connectionMock
    ? connectionMock
    : MongoClient.connect(URLMock, OPTION);
};

module.exports = { getConnection };
