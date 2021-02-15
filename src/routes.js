import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ResizerController from './app/controllers/ResizerController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/resizer', upload.array('images'), ResizerController.store);
export default routes;
