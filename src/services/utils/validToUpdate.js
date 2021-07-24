const validToUpdate = (recipe, user) => {
  const { _id: userId } = user;
  if (user.role === 'admin') return true;
  if (recipe.userId.equals(userId)) return true;
  return false;
};

module.exports = validToUpdate;
