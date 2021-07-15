const { invalidEntriesError } = require('./errorsMessages');

const validateEmail = (email) => /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email);

const validateNewUser = (newUser) => {
  const { name, email, password } = newUser;
  
  if (!name || !password || !validateEmail(email)) throw invalidEntriesError;
};

module.exports = {
  validateNewUser,
};
