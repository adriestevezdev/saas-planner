# SaaS Project Planner

## MVP - Funcionalidades Core

### Frontend (Next.js)

- **Landing Page**: Input principal para capturar ideas de proyectos
- **Canvas Visual**: Vista interactiva tipo diagrama para planificación
- **Editor de Documentos**: Vista y edición de archivos generados
- **Panel de Proyecto**: Dashboard con:
  - Vista general del proyecto
  - Lista de documentos generados
  - Progress tracking de tareas
- **Generador de Arquitectura**: Sistema para crear arquitectura.md automáticamente
- **Generador de Tasks**: Creación inteligente de todolist.md

### Backend (Node.js/Express)

- **Models**: Project, Document, Task, Template
- **APIs REST** para:
  - Proyectos (CRUD)
  - Documentos (generar, editar, exportar)
  - Templates (gestión de plantillas)
  - AI Integration (OpenAI API)
- **Base de datos**: PostgreSQL con docker-compose.yml
- **Sistema de Plantillas**: Templates personalizables para diferentes tipos de SaaS

### Estructura Técnica

- **Frontend**: Next.js 14, TypeScript, React Flow, Tailwind CSS
- **Backend**: Node.js, Express, Drizzle ORM
- **Base de datos**: PostgreSQL (docker-compose)
- **IA**: OpenAI API para generación inteligente
- **Canvas**: React Flow para visualización interactiva
- **Estado**: Zustand para gestión de estado global
- **Exportación**: Markdown to PDF, GitHub integration