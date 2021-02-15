import { resolve } from 'path';
import sharp from 'sharp';
import sizeFormats from './sizeConfig';
import clearFolders from './clearFolders';
import folderFiles from './getFolderFiles';

const basePath = resolve(__dirname, '..', '..', 'tmp', 'uploads');
const unprocessedPath = resolve(basePath, 'unprocessed');

const resizeFiles = async (width, height, size, file) => {
  const fileUrl = `${unprocessedPath}/${file}`;
  await sharp(fileUrl)
    .resize({ width, height, fit: 'inside' })
    .toFormat('jpeg')
    .toFile(`${resolve(basePath, size)}/${file}`);
};

const processFiles = async () => {
  folderFiles(unprocessedPath).forEach(async file => {
    await sizeFormats.forEach(async size =>
      resizeFiles(size.width, size.heigth, size.folder, file)
    );
    await clearFolders(file, unprocessedPath);
  });
};

export default processFiles;
