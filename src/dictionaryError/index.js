const { badRequest, unauthorized } = require('../utils/statusHttp');

module.exports = {
    jwtMalformed: () => ({
        status: unauthorized,
        message: 'jwt malformed',
    }),

    invalidEntries: () => ({
        status: badRequest,
        message: 'Invalid entries. Try again.',
    }),

    incorrectNameorPass: () => ({
        status: unauthorized,
        message: 'Incorrect username or password',
    }),

    allFields: () => ({
        status: unauthorized,
        message: 'All fields must be filled',
    }),
};