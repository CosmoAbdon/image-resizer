import fs from 'fs';
import archiver from 'archiver';
import { resolve } from 'path';
import sizeFormats from './sizeConfig';
import folderFiles from './getFolderFiles';
import clearFolders from './clearFolders';

const basePath = resolve(__dirname, '..', '..', 'tmp', 'uploads');
const archivePath = resolve(basePath, 'processed');

const zipData = async () => {
  const output = fs.createWriteStream(
    `${archivePath}/${new Date().toISOString()}.zip`
  );
  const archive = archiver('zip', {
    zlib: { level: 2 },
  });
  output.on('close', async () => {
    sizeFormats.forEach(async size => {
      folderFiles(resolve(basePath, size.folder)).forEach(file => {
        clearFolders(file, resolve(basePath, size.folder));
      });
    });
    console.log('Pastas Limpas');
    console.log('Conteúdo Zipado');
  });

  archive.pipe(output);

  archive.directory(`${basePath}/large`, 'large');
  archive.directory(`${basePath}/small`, 'small');
  archive.directory(`${basePath}/thumbnail`, 'thumbnail');

  archive.finalize();
};

export default zipData;
