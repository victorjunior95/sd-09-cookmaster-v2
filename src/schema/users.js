const CODE = 400;

module.exports = (email) => {
    const emailVerify = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
    if (!emailVerify) return { CODE, message: 'Invalid entries. Try again.' };
}; 
