import { Router } from 'express';
import { generateProject, getProject, updateProject } from '../controllers/projectController';

const router = Router();

router.post('/generate', generateProject);
router.get('/:id', getProject);
router.put('/:id', updateProject);

export default router;