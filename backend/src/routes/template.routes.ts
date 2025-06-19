import { Router, Request, Response } from 'express';
import { TemplateController } from '../controllers/template.controller';

const router = Router();
const templateController = new TemplateController();

router.get('/', async (req: Request, res: Response) => {
  await templateController.getTemplates(req, res);
});

export default router;