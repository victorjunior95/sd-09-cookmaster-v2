const BAD_REQUEST = 400;
const checkUserData = (req, res, next) => {
  const { name, email, password } = req.body;
  const emailIsValid = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const testEmail = emailIsValid.test(email);
  // const emailIsValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (name === undefined || email === undefined || !testEmail || password === undefined) {
    return res.status(BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }
  return next();
};

module.exports = checkUserData;