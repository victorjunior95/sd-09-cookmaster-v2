const loginService = require('../service/login');

const validateLogin = async (request, response) => {
  const { email, password } = request.body;
  const { status, generateToken } = await loginService.validateLogin(email, password);
  // console.log(`login controller ${generateToken}`);
  /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYwZmM0YzkzYjRjMWY4MmYzNmM2MGEyYiIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTYyNzE0NzkyMiwiZXhwIjoxNjI3MTQ4ODIyfQ.jDYFiXP1F35w0noed8URvkw4N8oP8C5-G2z7wE9QcRs */
  return response.status(status).json({ generateToken });
};

module.exports = {
  validateLogin,
};
