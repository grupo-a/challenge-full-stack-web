import { Router } from 'express';
import studentController from './controllers/studentController';

const routes = Router();

routes.get('/students', studentController.index);
routes.get('/students/:id', studentController.show);
routes.post('/students/', studentController.create);
routes.put('/students/:id', studentController.update);
routes.delete('/students/:id', studentController.delete);

export default routes;
