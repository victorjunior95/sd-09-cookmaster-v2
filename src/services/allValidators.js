function nameIsValid(name) {
  if (!name) return false;
  return true;
}

function emailIsValid(email) {
  const emailpattern = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
  if (!email || !emailpattern.test(email)) return false;
  return true;
}

function passwordIsValid(password) {
  const passwordPattern = /[\S]{6,}/;
  if (!password || !passwordPattern.test(password)) return false;
  return true;
}

module.exports = {
  nameIsValid,
  emailIsValid,
  passwordIsValid,
};
