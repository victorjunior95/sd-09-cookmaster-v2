// requisito 1
const status = {
  badRequest: 400,
  conflict: 409,
  created: 201,
};

const message = {
  invalidEntries: 'Invalid entries. Try again.',
  emailRegisterd: 'Email already registered',
};

module.exports = {
  status,
  message,
};
