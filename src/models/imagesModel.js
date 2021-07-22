const connection = require('./connection');

module.exports = {
  showImage: async (image) => {
    const showImage = await connection().then((db) =>
      db.collection('recipes').findOne({ ...image }));

    return showImage;
  },
};
