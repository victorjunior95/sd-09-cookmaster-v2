const message = {
  m1: [400, { message: 'Invalid entries. Try again' }],
  m2: [401, { message: 'All fields must be filled' }],
  m3: [401, { message: 'Incorrect username or password' }],
  m4: [401, { message: 'jwt malformed' }],
  m5: [401, { message: 'missing atuh token' }],
  m6: [403, { message: 'Only admins can register new admins' }],
  m7: [404, { message: 'recipe not found' }],
  m8: [409, { message: 'Email already registered' }],
};

module.exports = message;
