import { db, projects, documents, NewProject, NewDocument } from '../db';
import { ProjectGenerateRequest } from '../types/project.types';
import { generateDocuments } from './openai.service';
import { eq } from 'drizzle-orm';

export class ProjectService {
  async generateProject(data: ProjectGenerateRequest) {
    // Create project in database
    const [project] = await db.insert(projects).values({
      name: data.name,
      description: data.description,
      userId: data.userId,
      metadata: data.metadata,
      status: 'generating',
    }).returning();

    try {
      // Generate documents using OpenAI
      const { arquitectura, todolist } = await generateDocuments({
        name: data.name,
        description: data.description,
      });

      // Save documents
      await db.insert(documents).values([
        {
          projectId: project.id,
          type: 'arquitectura',
          content: arquitectura,
          metadata: {},
        },
        {
          projectId: project.id,
          type: 'todolist',
          content: todolist,
          metadata: {},
        },
      ]);

      // Update project status
      await db.update(projects)
        .set({ status: 'completed' })
        .where(eq(projects.id, project.id));

      return {
        project: {
          id: project.id,
          name: project.name,
          description: project.description,
          status: 'completed',
        },
        documents: {
          arquitectura,
          todolist,
        },
      };
    } catch (error) {
      // Update project status to failed
      await db.update(projects)
        .set({ status: 'failed' })
        .where(eq(projects.id, project.id));
      
      throw error;
    }
  }

  async getProject(id: number) {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    
    if (!project) {
      throw new Error('Project not found');
    }

    const projectDocuments = await db.select()
      .from(documents)
      .where(eq(documents.projectId, id));

    return {
      ...project,
      documents: projectDocuments,
    };
  }

  async updateProject(id: number, data: Partial<NewProject>) {
    const [updated] = await db.update(projects)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning();

    if (!updated) {
      throw new Error('Project not found');
    }

    return updated;
  }
}