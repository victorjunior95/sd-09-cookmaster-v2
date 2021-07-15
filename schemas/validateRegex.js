module.exports = (regex, toBeMatched) => {
  const isValid = regex.test(toBeMatched);

  return isValid;
};
