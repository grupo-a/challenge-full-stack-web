import { Router } from 'express';

import studentsRouter from '@modules/student/infra/http/routes/student.routes';

const routes = Router();

routes.use('/students', studentsRouter);

export default routes;
