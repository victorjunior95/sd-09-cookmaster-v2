const { addUser } = require('../../models/users/index');
const userExists = require('../utils/userExists');
const { verifyEmail } = require('../utils/regex');

const fieldsNExist = (name, email, password) => {
  if (!name || !email || !password) {
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'userFieldNExists' };
  }

  return null;
};

const verifyUser = async (name, email, password) => {
  const fields = fieldsNExist(name, email, password);

  if (fields) {
    return fields;
  }

  if (!verifyEmail(email)) {
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'userFieldNExists' };
  }

  if (await userExists('email', email)) {
    return { 
      error: true,
      code: 'STATUS_CONFLICT',
      message: 'emailAlreadyExists',
    };
  }

  return null;
};

const setUser = async (name, email, password, role) => {
  const invalidUser = await verifyUser(name, email, password);

  if (invalidUser) {
    return invalidUser;
  }
  
  const user = await addUser({ name, email, password, role });
  return { error: false, code: 'STATUS_OK', message: user };
};

module.exports = setUser;