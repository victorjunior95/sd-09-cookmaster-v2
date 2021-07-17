
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server')

const connectionMock = async () => {
  const DBServer = await MongoMemoryServer.create()
  const URLMock = await DBServer.getUri();
  return MongoClient(URLMock, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connectionMock;