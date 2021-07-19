const model = require('../models/users');

const error1 = {  
  err: { 
    error: 400,       
    message: 'Invalid entries. Try again.',
  },
};

const error2 = {
  err: {    
    error: 409,      
    message: 'Email already registered',
  },
};

function verify(name, email, password) {
  if (!name || !email || !password) {
    return true;
  }
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return true; 
  }
}

const testEmail = async (email) => {
  const checkEmail = await model.findByEmail({ email });
  console.log(checkEmail);
  return checkEmail;
};

const createUser = async (name, email, password) => {
  if (await testEmail(email)) {
    return error2;
  }
  if (await verify(name, email, password)) {
    return error1;
  }
  const role = 'user';
  const newUser = model.create(name, email, password, role);
  return newUser;
};

module.exports = {
  createUser,
};