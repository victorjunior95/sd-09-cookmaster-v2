const JOI = require('joi');

const errorMsgGeneric = 'Invalid entries. Try again.';
const typeMsg = 'userGeneric';

const USER_SCHEMA = JOI.object({
  name: JOI.string().required()
    .error(() => ({ message: errorMsgGeneric, type: typeMsg })),

    email: JOI.string().email().required()
    .error(() => ({ message: errorMsgGeneric, type: typeMsg })),

    password: JOI.string().required()
    .error(() => ({ message: errorMsgGeneric, type: typeMsg })),

    role: JOI.string().equal(['user', 'admin'])
    .error(() => ({ message: errorMsgGeneric, type: typeMsg })),
});

const RECIPE_SCHEMA = JOI.object({
  name: JOI.string().required(),
  ingredients: JOI.string().required(),
  preparation: JOI.string().required(),
});

module.exports = {
  USER_SCHEMA,
  RECIPE_SCHEMA,
};
