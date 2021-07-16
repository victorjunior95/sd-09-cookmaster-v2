const {
    badRequest,
    unauthorized,
    conflict,
    notFound,
} = require('../utils/statusHttp');

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

    emailAlreadyExists: () => ({
        status: conflict,
        message: 'Email already registered',
    }),

    recipeNotFound: () => ({
        status: notFound,
        message: 'recipe not found',
    }),
};