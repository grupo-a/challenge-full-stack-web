import { group } from 'console';
import { Router } from 'express';
import studentController from './controllers/studentController';

const routes = Router();

routes.route('/students').post(studentController.create);

export default routes;
