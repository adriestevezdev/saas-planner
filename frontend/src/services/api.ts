import axios from 'axios';
import { ProjectGenerateRequest, ProjectGenerateResponse, Project, Document } from '@/types/project.types';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectService = {
  generateProject: async (data: ProjectGenerateRequest): Promise<ProjectGenerateResponse> => {
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('Full URL:', `${API_BASE_URL}/projects/generate`);
    console.log('Request data:', data);
    const response = await api.post<ProjectGenerateResponse>('/projects/generate', data);
    return response.data;
  },

  getProject: async (id: number): Promise<Project & { documents: Document[] }> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  updateProject: async (id: number, data: Partial<Project>): Promise<Project> => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },
};

export const templateService = {
  getTemplates: async () => {
    const response = await api.get('/templates');
    return response.data;
  },
};

// Export specific functions for easier use
export const getProjectDetails = projectService.getProject;