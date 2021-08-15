function isEmailValid(email) {
    const regex = /.+@.+\..+/;
    return email && regex.test(email);
}

module.exports = {
    isEmailValid,
};