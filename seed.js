const { Db } = require("mongodb");
const { use } = require("./src/routes/users")

// colocar query do MongoDB
db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
