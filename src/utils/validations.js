module.exports = {
  validateFields: (name, email, password) => {
    const regex = /(\S*)@(\w*)(\.\w*){1,2}/i;

    if (!name || !email || !password || !email.match(regex)) return false;

    return { name, email, password };
  },
};
