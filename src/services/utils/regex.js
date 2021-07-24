const verifyEmail = (email) => /\w{3,60}@\w{3,60}\.(\w{2,3}){1,2}/.test(email);

const MINLENGTH = 6;
const verifyPassword = (password) => password.length !== MINLENGTH;

module.exports = {
  verifyEmail,
  verifyPassword,
};
