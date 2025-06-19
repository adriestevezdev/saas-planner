export interface ProjectGenerateRequest {
  name: string;
  description: string;
  userId: string;
  metadata?: Record<string, any>;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  userId: string;
  status: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: number;
  projectId: number;
  type: 'arquitectura' | 'todolist';
  content: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectGenerateResponse {
  project: {
    id: number;
    name: string;
    description: string;
    status: string;
  };
  documents: {
    arquitectura: string;
    todolist: string;
  };
}