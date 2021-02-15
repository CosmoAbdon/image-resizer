import fs from 'fs';

const clearFolders = async (file, path) => {
  const filePath = `${path}/${file}`;
  try {
    if (file !== '.gitkeep') await fs.promises.stat(filePath);
  } catch (e) {
    return;
  }

  await fs.promises.unlink(filePath);
};

export default clearFolders;
