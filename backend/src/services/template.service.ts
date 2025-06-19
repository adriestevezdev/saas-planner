import { db, templates } from '../db';
import { eq } from 'drizzle-orm';

export class TemplateService {
  async getActiveTemplates() {
    return await db.select()
      .from(templates)
      .where(eq(templates.isActive, true));
  }

  async getTemplateByType(type: 'arquitectura' | 'todolist') {
    const results = await db.select()
      .from(templates)
      .where(eq(templates.type, type));

    // Filter for active templates
    const activeTemplates = results.filter(t => t.isActive);
    return activeTemplates[0];
  }

  async createDefaultTemplates() {
    const defaultTemplates = [
      {
        name: 'Arquitectura Default',
        type: 'arquitectura',
        content: `# Arquitectura de {{PROJECT_NAME}}

## Descripción General
{{PROJECT_DESCRIPTION}}

## Arquitectura del Sistema

### Frontend
- **Framework**: {{FRONTEND_FRAMEWORK}}
- **Estado**: {{STATE_MANAGEMENT}}
- **Estilos**: {{STYLING_SOLUTION}}

### Backend
- **Framework**: {{BACKEND_FRAMEWORK}}
- **Base de Datos**: {{DATABASE}}
- **Autenticación**: {{AUTH_SOLUTION}}

### Infraestructura
- **Hosting**: {{HOSTING_PROVIDER}}
- **CI/CD**: {{CI_CD_SOLUTION}}
- **Monitoreo**: {{MONITORING_SOLUTION}}

## Componentes Principales
{{MAIN_COMPONENTS}}

## Flujo de Datos
{{DATA_FLOW}}

## Consideraciones de Seguridad
{{SECURITY_CONSIDERATIONS}}

## Escalabilidad
{{SCALABILITY_APPROACH}}`,
        variables: [
          'PROJECT_NAME',
          'PROJECT_DESCRIPTION',
          'FRONTEND_FRAMEWORK',
          'STATE_MANAGEMENT',
          'STYLING_SOLUTION',
          'BACKEND_FRAMEWORK',
          'DATABASE',
          'AUTH_SOLUTION',
          'HOSTING_PROVIDER',
          'CI_CD_SOLUTION',
          'MONITORING_SOLUTION',
          'MAIN_COMPONENTS',
          'DATA_FLOW',
          'SECURITY_CONSIDERATIONS',
          'SCALABILITY_APPROACH'
        ],
      },
      {
        name: 'TodoList Default',
        type: 'todolist',
        content: `# Plan de Desarrollo - {{PROJECT_NAME}}

## Fase 1: Configuración Inicial ({{PHASE1_DURATION}})
{{PHASE1_TASKS}}

## Fase 2: Desarrollo Core ({{PHASE2_DURATION}})
{{PHASE2_TASKS}}

## Fase 3: Funcionalidades Avanzadas ({{PHASE3_DURATION}})
{{PHASE3_TASKS}}

## Fase 4: Testing y Optimización ({{PHASE4_DURATION}})
{{PHASE4_TASKS}}

## Fase 5: Deployment ({{PHASE5_DURATION}})
{{PHASE5_TASKS}}

## Consideraciones Adicionales
{{ADDITIONAL_CONSIDERATIONS}}`,
        variables: [
          'PROJECT_NAME',
          'PHASE1_DURATION',
          'PHASE1_TASKS',
          'PHASE2_DURATION',
          'PHASE2_TASKS',
          'PHASE3_DURATION',
          'PHASE3_TASKS',
          'PHASE4_DURATION',
          'PHASE4_TASKS',
          'PHASE5_DURATION',
          'PHASE5_TASKS',
          'ADDITIONAL_CONSIDERATIONS'
        ],
      },
    ];

    for (const template of defaultTemplates) {
      await db.insert(templates).values(template);
    }
  }
}