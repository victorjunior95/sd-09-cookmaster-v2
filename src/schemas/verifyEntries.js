module.exports = (body) => {
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return { err: { message: 'Invalid entries. Try again.' },
      code: 'bad_request' };
  } 

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;
  const regexTest = emailRegex.test(email);
  if (!regexTest) {
    return { err: { message: 'Invalid entries. Try again.' },
      code: 'bad_request' };  
  } 

  return {};
};
