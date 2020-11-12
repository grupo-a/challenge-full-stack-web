import { group } from 'console';
import { Router } from 'express';
import studentController from './controllers/studentController';

const routes = Router();

routes.get('/students', studentController.index);
routes.post('/students/', studentController.create);
routes.put('/students/:id', studentController.update);

export default routes;
