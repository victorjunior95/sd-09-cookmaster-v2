const { Db } = require("mongodb");
const { use } = require("./src/routes/users")

// colocar query do MongoDB
use('Cookmaster');

db.users.insertOne({
  name: 'admins', email: 'root@email.com', password: 'admin', role: 'admin'
})
