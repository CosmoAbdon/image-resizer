import multer from 'multer';
import { resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(
      __dirname,
      '..',
      '..',
      'tmp',
      'uploads',
      'unprocessed'
    ),
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
};
