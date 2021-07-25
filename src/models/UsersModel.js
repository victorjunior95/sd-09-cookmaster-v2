const connect = require('./connection');

const findByEmail = async (email) => {
  const connection = await connect();
  const user = await connection.collection('users').findOne({ email });

  return Boolean(user);
};

const register = async (user) => {
  const connection = await connect();
  console.log(`model ${user.name}, ${user.email}, ${user.password}, ${user.role}`);
  const answer = await connection.collection('users')
  .insertOne(user);

  console.log(`model ${answer}`);
  // {
  //   "result": {"n": 1,"ok":1},
  //   "connection":{"_events":{},"_eventsCount":4,"id":1,"address":"127.0.0.1:27017","bson":{},"socketTimeout":360000,"monitorCommands":false,"closed":false,"destroyed":false,"lastIsMasterMS":1},
  //   "ops":[{"name":"Erick Jacquin","email":"erickjaquin@gmail.com","password":"12345678","role":"user","_id":"60fdebdbbf296e8cf02a849b"}],
  //   "insertedCount":1,
  //   "insertedId":"60fdebdbbf296e8cf02a849b",
  //   "n":1,
  //   "ok":1
  // }
  const { ops } = answer;
  console.log(`model ${ops.map((arr) => arr)}`);
  return answer.ops[0];
};

module.exports = {
  findByEmail,
  register,
};
