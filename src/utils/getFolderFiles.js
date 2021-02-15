import fs from 'fs';

const folderFiles = path => {
  const files = fs.readdirSync(path).map(file => file);
  return files;
};

export default folderFiles;
