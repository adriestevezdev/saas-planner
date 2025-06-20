'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Project, Document } from '@/types/project.types';
import { projectService } from '@/services/api';

// Dynamic import to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface DocumentEditorProps {
  project: Project;
}

export default function DocumentEditor({ project }: DocumentEditorProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [content, setContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autoSaveTimeout = useRef<NodeJS.Timeout | null>(null);

  // Load documents
  useEffect(() => {
    if (project.documents && project.documents.length > 0) {
      setDocuments(project.documents);
      setSelectedDoc(project.documents[0]);
      setContent(project.documents[0].content);
    }
  }, [project]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current);
    }

    // Auto-save after 2 seconds of inactivity
    autoSaveTimeout.current = setTimeout(() => {
      if (selectedDoc && content !== selectedDoc.content) {
        handleSave();
      }
    }, 2000);

    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, [content, selectedDoc]);

  const handleSave = useCallback(async () => {
    if (!selectedDoc || content === selectedDoc.content) return;

    setIsSaving(true);
    try {
      // TODO: Implement save endpoint in backend
      // await projectService.updateDocument(selectedDoc.id, { content });
      console.log('Saving document:', selectedDoc.id, content);
      
      // Update local state
      setDocuments(docs => 
        docs.map(doc => 
          doc.id === selectedDoc.id ? { ...doc, content } : doc
        )
      );
      setSelectedDoc({ ...selectedDoc, content });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save document:', error);
    } finally {
      setIsSaving(false);
    }
  }, [selectedDoc, content]);

  const handleDocumentChange = (doc: Document) => {
    // Save current document before switching
    if (selectedDoc && content !== selectedDoc.content) {
      handleSave();
    }
    setSelectedDoc(doc);
    setContent(doc.content);
  };

  const exportAsMarkdown = () => {
    if (!selectedDoc) return;
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name}-${selectedDoc.type}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar with document list */}
      <div className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Documents</h3>
        </div>
        <div className="p-2">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => handleDocumentChange(doc)}
              className={`w-full text-left px-4 py-2 rounded-md mb-1 transition-colors ${
                selectedDoc?.id === doc.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="font-medium capitalize">{doc.type}</div>
              <div className="text-sm text-gray-500">
                {new Date(doc.createdAt).toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="font-medium text-gray-700">
              {selectedDoc ? selectedDoc.type.charAt(0).toUpperCase() + selectedDoc.type.slice(1) : 'Select a document'}
            </h3>
            {isSaving && (
              <span className="text-sm text-gray-500 flex items-center">
                <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            )}
            {lastSaved && !isSaving && (
              <span className="text-sm text-gray-500">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              disabled={!selectedDoc || content === selectedDoc?.content}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Save
            </button>
            <button
              onClick={exportAsMarkdown}
              disabled={!selectedDoc}
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Export
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 p-4" data-color-mode="light">
          {selectedDoc ? (
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || '')}
              preview="live"
              height="100%"
              visibleDragbar={false}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a document to start editing
            </div>
          )}
        </div>
      </div>
    </div>
  );
}