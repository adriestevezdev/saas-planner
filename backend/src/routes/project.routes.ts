import { Router, Request, Response } from 'express';
import { ProjectController } from '../controllers/project.controller';

const router = Router();
const projectController = new ProjectController();

router.post('/generate', async (req: Request, res: Response) => {
  await projectController.generateProject(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
  await projectController.getProject(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
  await projectController.updateProject(req, res);
});

export default router;