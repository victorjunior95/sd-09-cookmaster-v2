const path = require('path');
const fs = require('fs/promises');

async function renameUploadedFile(originalFile, newName) {
    const basePath = path.resolve(__dirname, '..', 'uploads');
    await fs.rename(path.resolve(basePath, originalFile.filename), path.resolve(basePath, newName));
}

module.exports = renameUploadedFile;