-- Note: Database creation is handled by docker-compose POSTGRES_DB environment variable
-- Connect to the saas_planner database
\c saas_planner;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft' NOT NULL,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) NOT NULL,
    type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    variables JSON,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_project_id ON documents(project_id);
CREATE INDEX IF NOT EXISTS idx_templates_type ON templates(type);

-- Insert sample templates for architecture
INSERT INTO templates (name, type, content, variables) VALUES
('SaaS Architecture', 'arquitectura', '# Arquitectura de {{PROJECT_NAME}}

## Descripción General
{{PROJECT_DESCRIPTION}}

## Stack Tecnológico
- **Frontend**: Next.js 14 con TypeScript
- **Backend**: Node.js con Express/Fastify
- **Base de Datos**: PostgreSQL con Drizzle ORM
- **Autenticación**: JWT con refresh tokens
- **Cache**: Redis
- **File Storage**: AWS S3 o Cloudinary

## Arquitectura del Sistema

### Frontend
- Next.js App Router para mejor SEO y performance
- Tailwind CSS para estilos
- Zustand para manejo de estado
- React Query para cache de datos

### Backend
- API RESTful con Express
- Arquitectura en capas (Controllers, Services, Repositories)
- Validación con Zod
- Rate limiting y seguridad con Helmet

### Base de Datos
- PostgreSQL para datos relacionales
- Redis para cache y sesiones
- Migrations con Drizzle

## Características Principales
1. Sistema de autenticación completo
2. Panel de administración
3. Sistema de suscripciones con Stripe
4. Notificaciones en tiempo real
5. API pública con rate limiting

## Consideraciones de Seguridad
- HTTPS en producción
- Variables de entorno seguras
- Validación de entrada
- Protección CSRF
- Rate limiting por IP', '["PROJECT_NAME", "PROJECT_DESCRIPTION"]'),

('Todolist SaaS', 'todolist', '# Lista de Tareas - {{PROJECT_NAME}}

## 🚀 Fase 1: MVP (2-3 semanas)

### Configuración Inicial
- [ ] Configurar repositorio Git
- [ ] Inicializar proyecto Next.js
- [ ] Configurar TypeScript y ESLint
- [ ] Configurar Tailwind CSS
- [ ] Configurar base de datos PostgreSQL
- [ ] Implementar Drizzle ORM

### Autenticación
- [ ] Implementar registro de usuarios
- [ ] Implementar login con JWT
- [ ] Crear middleware de autenticación
- [ ] Implementar recuperación de contraseña
- [ ] Agregar verificación de email

### Funcionalidades Core
- [ ] Crear modelo de datos principal
- [ ] Implementar CRUD básico
- [ ] Crear API endpoints
- [ ] Implementar validaciones
- [ ] Agregar paginación

### Frontend Básico
- [ ] Crear layout principal
- [ ] Implementar navegación
- [ ] Crear páginas principales
- [ ] Implementar formularios
- [ ] Agregar manejo de errores

## 📈 Fase 2: Características Avanzadas (3-4 semanas)

### Sistema de Suscripciones
- [ ] Integrar Stripe
- [ ] Crear planes de suscripción
- [ ] Implementar límites por plan
- [ ] Crear página de precios
- [ ] Implementar webhooks de Stripe

### Panel de Administración
- [ ] Dashboard con métricas
- [ ] Gestión de usuarios
- [ ] Gestión de suscripciones
- [ ] Logs de actividad
- [ ] Configuración del sistema

### Optimizaciones
- [ ] Implementar cache con Redis
- [ ] Optimizar queries de base de datos
- [ ] Agregar lazy loading
- [ ] Implementar CDN para assets
- [ ] Optimizar bundle size

## 🎯 Fase 3: Lanzamiento (2 semanas)

### Preparación para Producción
- [ ] Configurar CI/CD
- [ ] Implementar monitoring (Sentry)
- [ ] Configurar backups automáticos
- [ ] Documentar API
- [ ] Crear términos y condiciones

### Marketing y Landing
- [ ] Crear landing page
- [ ] Implementar SEO
- [ ] Configurar analytics
- [ ] Crear blog
- [ ] Preparar email marketing

### Testing
- [ ] Escribir tests unitarios
- [ ] Implementar tests E2E
- [ ] Realizar pruebas de carga
- [ ] Test de seguridad
- [ ] Beta testing con usuarios

## 🔄 Post-Lanzamiento

### Mejoras Continuas
- [ ] Recopilar feedback de usuarios
- [ ] Implementar nuevas características
- [ ] Optimizar performance
- [ ] Escalar infraestructura
- [ ] Actualizar documentación', '["PROJECT_NAME"]')
ON CONFLICT DO NOTHING;