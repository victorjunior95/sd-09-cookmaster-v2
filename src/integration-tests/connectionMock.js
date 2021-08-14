const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mockConn;
const DBServer = new MongoMemoryServer();

const connectionMock = async () => {
  const URLMock = await DBServer.getUri();
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  return mockConn ? mockConn : MongoClient.connect(URLMock, OPTIONS);
};

module.exports = connectionMock;