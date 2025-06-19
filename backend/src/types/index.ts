export interface Project {
  id: string;
  name: string;
  description: string;
  architecture: string;
  todolist: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  content: string;
  createdAt: Date;
}

export interface ProjectGenerationRequest {
  name: string;
  description: string;
  features: string[];
  techStack?: string[];
  industry?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}