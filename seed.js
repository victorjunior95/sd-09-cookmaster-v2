// colocar query do MongoDB
const cookmasterDb = require('./src/model/cookmasterDb');

const db = await cookmasterDb();
db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });