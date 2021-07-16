const checkLoginData = (email, password) => {
  if (!email || !password) {
    return {
      message: 'All fields must be filled',
    };
  }
};

const checkEmailAndPassword = (userSearch, email, password) => {
  if (!userSearch || userSearch.email !== email || userSearch.password !== password) {
    return { message: 'Incorrect username or password' };
  }
};

module.exports = { checkLoginData, checkEmailAndPassword };