const message = {
  type1: { error: [400, { message: 'Invalid entries. Try again.' }] },
  type2: { error: [401, { message: 'All fields must be filled' }] },
  type3: { error: [401, { message: 'Incorrect username or password' }] },
  type4: { error: [401, { message: 'jwt malformed' }] },
  type5: { error: [401, { message: 'missing atuh token' }] },
  type6: { error: [403, { message: 'Only admins can register new admins' }] },
  type7: { error: [404, { message: 'recipe not found' }] },
  type8: { error: [409, { message: 'Email already registered' }] },
  type9: { error: [500, { message: 'Internal Server Error' }] },
};

module.exports = message;
