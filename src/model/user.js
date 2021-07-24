const connection = require('../other/connection');

const USERS = 'users';

const findUserByEmailModel = async (email) => {
  const db = await connection();
  const userByEmail = await db.collection(USERS).findOne({ email });
  return userByEmail;
};

const insertUserModel = async (newUser) => {
  const db = await connection();
  const createdUser = await db.collection(USERS).insertOne(newUser);
  // console.log(`variavel createdUser ${createdUser}`);
  return createdUser.ops[0];
 };

 /* retorno createdUser {"result":{"n":1,"ok":1},"connection":{"_events":{},"_eventsCount":4,"id":1,"address":"127.0.0.1:27017","bson":{},"socketTimeout":360000,"monitorCommands":false,"closed":false,"destroyed":false,"lastIsMasterMS":1},"ops":[{"name":"jc","email":"jc@gmail.com","password":"testes","role":"user","_id":"60fc2a3fb94e7b1ad1762600"}],"insertedCount":1,"insertedId":"60fc2a3fb94e7b1ad1762600","n":1,"ok":1}  */

module.exports = {
  findUserByEmailModel,
  insertUserModel,
};
