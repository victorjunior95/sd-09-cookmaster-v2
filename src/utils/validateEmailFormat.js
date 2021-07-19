const validateEmailFormat = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

module.exports = validateEmailFormat;
