const fieldsNExist = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'userFieldNExists' };
  }

  return null;
};

module.exports = {
  fieldsNExist,
};
