const { getUserField } = require('../../models/users/index');

const userExists = async (field, value) => {
  const user = await getUserField(field, value);
  if (user) return user;
  return false; 
};

module.exports = userExists;
