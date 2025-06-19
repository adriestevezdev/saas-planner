import { Request, Response } from 'express';
import { TemplateService } from '../services/template.service';

const templateService = new TemplateService();

export class TemplateController {
  async getTemplates(req: Request, res: Response) {
    try {
      const templates = await templateService.getActiveTemplates();
      
      return res.json(templates);
    } catch (error) {
      console.error('Error getting templates:', error);
      return res.status(500).json({
        error: 'Failed to get templates',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}