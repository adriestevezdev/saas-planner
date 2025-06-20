'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DocumentEditor from '@/components/DocumentEditor';
import { getProjectDetails } from '@/services/api';
import { Project } from '@/types/project.types';

export default function EditorPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const projectData = await getProjectDetails(projectId);
        setProject(projectData);
      } catch (err) {
        setError('Failed to load project');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error || 'Project not found'}</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-semibold">{project.name} - Document Editor</h1>
        <p className="text-gray-600 mt-1">{project.description}</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <DocumentEditor project={project} />
      </div>
    </div>
  );
}