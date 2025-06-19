import { Router } from 'express';
import projectRoutes from './project.routes';
import templateRoutes from './template.routes';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/templates', templateRoutes);

export default router;