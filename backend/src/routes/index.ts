import { Router } from 'express';
import projectRoutes from './projectRoutes';

const router = Router();

router.use('/api/projects', projectRoutes);

export default router;