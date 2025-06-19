# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SaaS Planner is a web application that generates SaaS project documentation (architecture and task lists) using AI. It consists of:
- **Backend**: Express.js API with TypeScript, PostgreSQL, and Drizzle ORM
- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS, React Hook Form
- **AI Integration**: OpenAI API for intelligent document generation
- **Development**: Docker Compose orchestrating all services

## Essential Development Commands

### Starting the Development Environment
```bash
# Start all services (database, backend, frontend, adminer)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset everything including database
docker-compose down -v
```

### Backend Commands
```bash
cd backend
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript
npm run lint         # Run ESLint
npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Apply migrations
npm run db:push      # Push schema changes
npm run db:studio    # Open Drizzle Studio (database browser)
```

### Frontend Commands
```bash
cd frontend
npm run dev    # Start Next.js dev server
npm run build  # Production build
npm run lint   # Run linter
```

## Architecture & Key Patterns

### API Communication
- Frontend calls backend at `http://localhost:3001/api`
- All API responses follow the pattern: `{ success: boolean, data?: any, error?: string }`
- Services in `frontend/services/` handle API calls with proper typing

### Database Schema (Drizzle ORM)
```typescript
// backend/src/db/schema.ts
- projects: Main project entity (id, name, description, status, metadata)
- documents: Generated docs linked to projects (type: 'architecture' | 'todolist')
- templates: Customizable document templates with variable substitution
```

### Core Services
- **ProjectService**: Handles project CRUD operations and orchestrates document generation
- **OpenAIService**: Manages AI interactions with retry logic and error handling
- **TemplateService**: Template management and variable substitution

### Frontend State Management
- Forms use `react-hook-form` for validation
- API state handled locally in components (no global state yet)
- Zustand installed but not implemented

## Environment Variables

Backend requires:
```
OPENAI_API_KEY=your-api-key-here
DATABASE_URL=postgresql://admin:password123@postgres:5432/saas_planner
PORT=3001
```

## Database Access
- PostgreSQL: `localhost:5432` (user: admin, password: password123)
- Adminer UI: `http://localhost:8080`

## Current Implementation Status

✅ Completed:
- Docker setup with all services
- Backend API with database integration
- Frontend form for project generation
- AI-powered document generation
- Template system

❌ Not Implemented:
- Visual canvas (React Flow)
- User authentication
- Document editor
- Export features (PDF, GitHub)
- Project list/dashboard

## Common Tasks

### Adding a New API Endpoint
1. Add route in `backend/src/routes/`
2. Implement controller in `backend/src/controllers/`
3. Add service logic in `backend/src/services/`
4. Update frontend API service in `frontend/services/api.ts`

### Working with Database
1. Modify schema in `backend/src/db/schema.ts`
2. Generate migration: `npm run db:generate`
3. Apply migration: `npm run db:migrate`

### Testing API Endpoints
Use the included REST client file or:
```bash
curl http://localhost:3001/health
```

## Important Files
- `backend/src/index.ts` - Main API server entry
- `backend/src/db/schema.ts` - Database schema
- `frontend/app/page.tsx` - Main landing page
- `frontend/components/ProjectForm.tsx` - Core form component
- `todolist.md` - Development roadmap with task tracking