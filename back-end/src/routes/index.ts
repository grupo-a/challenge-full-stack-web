import { Router } from 'express';
import studentRoutes from './Student.routes';

const router = Router();

router.use("/students", studentRoutes);

export default router;