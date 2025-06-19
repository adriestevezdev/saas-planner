import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';
import { ProjectGenerateRequest, ProjectUpdateRequest } from '../types/project.types';

const projectService = new ProjectService();

export class ProjectController {
  async generateProject(req: Request, res: Response) {
    try {
      const data: ProjectGenerateRequest = req.body;
      
      // Validate required fields
      if (!data.name || !data.description || !data.userId) {
        return res.status(400).json({
          error: 'Missing required fields: name, description, userId',
        });
      }

      const result = await projectService.generateProject(data);
      
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error generating project:', error);
      return res.status(500).json({
        error: 'Failed to generate project',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getProject(req: Request, res: Response) {
    try {
      const projectId = parseInt(req.params.id);
      
      if (isNaN(projectId)) {
        return res.status(400).json({
          error: 'Invalid project ID',
        });
      }

      const project = await projectService.getProject(projectId);
      
      return res.json(project);
    } catch (error) {
      console.error('Error getting project:', error);
      
      if (error instanceof Error && error.message === 'Project not found') {
        return res.status(404).json({
          error: 'Project not found',
        });
      }
      
      return res.status(500).json({
        error: 'Failed to get project',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const projectId = parseInt(req.params.id);
      const data: ProjectUpdateRequest = req.body;
      
      if (isNaN(projectId)) {
        return res.status(400).json({
          error: 'Invalid project ID',
        });
      }

      const updated = await projectService.updateProject(projectId, data);
      
      return res.json(updated);
    } catch (error) {
      console.error('Error updating project:', error);
      
      if (error instanceof Error && error.message === 'Project not found') {
        return res.status(404).json({
          error: 'Project not found',
        });
      }
      
      return res.status(500).json({
        error: 'Failed to update project',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}