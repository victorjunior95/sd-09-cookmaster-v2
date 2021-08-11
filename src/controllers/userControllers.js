const userService = require('../service/userService');

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const verifyReq = (name, password, email) => {
  let invalidEntries = false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateEmail = emailRegex.test(email);

  if (!name || !password || !email) {
    invalidEntries = true;
  }

  if (!validateEmail) {
    invalidEntries = true;
  }

  return invalidEntries;
};

const postUser = async (req, res) => {
  const { name, password, email } = req.body;
  const invalidEntries = verifyReq(name, password, email);
  const newUser = await userService.postUser(name, password, email);

  if (invalidEntries) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  } 

  if (newUser.message) {
    return res.status(409).json(newUser);
  }

  return res.status(201).json(newUser);
};

module.exports = { postUser };
