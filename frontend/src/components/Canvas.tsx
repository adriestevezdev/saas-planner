'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  Edge,
  Node,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  BackgroundVariant,
  NodeTypes,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Project } from '@/types/project.types';

// Custom node types
const ServiceNode = ({ data }: { data: any }) => {
  return (
    <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 min-w-[200px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col">
        <div className="font-bold text-blue-900">{data.label}</div>
        <div className="text-sm text-blue-700 mt-1">{data.type}</div>
        {data.technologies && (
          <div className="text-xs text-blue-600 mt-2">
            {data.technologies.join(', ')}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const DatabaseNode = ({ data }: { data: any }) => {
  return (
    <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 min-w-[180px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col items-center">
        <div className="font-bold text-green-900">{data.label}</div>
        <div className="text-sm text-green-700 mt-1">Database</div>
        {data.dbType && (
          <div className="text-xs text-green-600 mt-2">{data.dbType}</div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const APINode = ({ data }: { data: any }) => {
  return (
    <div className="bg-purple-100 border-2 border-purple-500 rounded-lg p-4 min-w-[160px]">
      <Handle type="target" position={Position.Left} />
      <div className="flex flex-col">
        <div className="font-bold text-purple-900">{data.label}</div>
        <div className="text-sm text-purple-700 mt-1">API</div>
        {data.protocol && (
          <div className="text-xs text-purple-600 mt-2">{data.protocol}</div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

const FrontendNode = ({ data }: { data: any }) => {
  return (
    <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 min-w-[200px]">
      <Handle type="target" position={Position.Bottom} />
      <div className="flex flex-col">
        <div className="font-bold text-yellow-900">{data.label}</div>
        <div className="text-sm text-yellow-700 mt-1">Frontend</div>
        {data.framework && (
          <div className="text-xs text-yellow-600 mt-2">{data.framework}</div>
        )}
      </div>
      <Handle type="source" position={Position.Top} />
    </div>
  );
};

const nodeTypes: NodeTypes = {
  service: ServiceNode,
  database: DatabaseNode,
  api: APINode,
  frontend: FrontendNode,
};

interface CanvasProps {
  project: Project;
}

export default function Canvas({ project }: CanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Parse project architecture to create nodes and edges
  useEffect(() => {
    if (project.documents && project.documents.length > 0) {
      const architectureDoc = project.documents.find(doc => doc.type === 'architecture');
      if (architectureDoc) {
        // Parse the architecture document to extract components
        // This is a simplified example - you'd want more sophisticated parsing
        const initialNodes: Node[] = [
          {
            id: '1',
            type: 'frontend',
            position: { x: 250, y: 0 },
            data: { 
              label: `${project.name} Frontend`,
              framework: 'Next.js + TypeScript'
            },
          },
          {
            id: '2',
            type: 'api',
            position: { x: 250, y: 150 },
            data: { 
              label: 'REST API',
              protocol: 'HTTP/REST'
            },
          },
          {
            id: '3',
            type: 'service',
            position: { x: 100, y: 300 },
            data: { 
              label: 'Auth Service',
              type: 'Authentication',
              technologies: ['JWT', 'OAuth']
            },
          },
          {
            id: '4',
            type: 'service',
            position: { x: 400, y: 300 },
            data: { 
              label: 'Business Logic',
              type: 'Core Service',
              technologies: ['Node.js', 'Express']
            },
          },
          {
            id: '5',
            type: 'database',
            position: { x: 250, y: 450 },
            data: { 
              label: 'Main Database',
              dbType: 'PostgreSQL'
            },
          },
        ];

        const initialEdges: Edge[] = [
          {
            id: 'e1-2',
            source: '1',
            target: '2',
            animated: true,
            label: 'API Calls',
          },
          {
            id: 'e2-3',
            source: '2',
            target: '3',
            label: 'Auth',
          },
          {
            id: 'e2-4',
            source: '2',
            target: '4',
            label: 'Business',
          },
          {
            id: 'e3-5',
            source: '3',
            target: '5',
            label: 'User Data',
          },
          {
            id: 'e4-5',
            source: '4',
            target: '5',
            label: 'App Data',
          },
        ];

        setNodes(initialNodes);
        setEdges(initialEdges);
      }
    }
  }, [project, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Double clicked node:', node);
    // TODO: Open node editor
  }, []);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <MiniMap 
          nodeStrokeColor={(node) => {
            switch (node.type) {
              case 'service': return '#3b82f6';
              case 'database': return '#10b981';
              case 'api': return '#8b5cf6';
              case 'frontend': return '#f59e0b';
              default: return '#6b7280';
            }
          }}
          nodeColor={(node) => {
            switch (node.type) {
              case 'service': return '#dbeafe';
              case 'database': return '#d1fae5';
              case 'api': return '#e9d5ff';
              case 'frontend': return '#fef3c7';
              default: return '#f3f4f6';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
}