export interface ProjectGenerateRequest {
  name: string;
  description: string;
  userId: string;
  metadata?: Record<string, any>;
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

export interface ProjectUpdateRequest {
  name?: string;
  description?: string;
  status?: string;
  metadata?: Record<string, any>;
}