import OpenAI from 'openai';
import { TemplateService } from './template.service';

// Only initialize OpenAI client if API key is provided
const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = openaiApiKey ? new OpenAI({
  apiKey: openaiApiKey,
}) : null;

interface DocumentGenerationInput {
  name: string;
  description: string;
}

export async function generateDocuments(input: DocumentGenerationInput) {
  if (!openai) {
    console.warn('OpenAI API key not configured. Returning mock data.');
    return {
      arquitectura: `# Arquitectura de ${input.name}\n\n${input.description}\n\n*[OpenAI API key not configured - This is mock data]*`,
      todolist: `# Plan de Desarrollo - ${input.name}\n\n## Fase 1: Configuración Inicial\n- [ ] Tarea 1\n- [ ] Tarea 2\n\n*[OpenAI API key not configured - This is mock data]*`,
    };
  }

  const templateService = new TemplateService();
  
  // Get templates
  const arquitecturaTemplate = await templateService.getTemplateByType('arquitectura');
  const todolistTemplate = await templateService.getTemplateByType('todolist');

  // Generate arquitectura document
  const arquitecturaPrompt = `
    Eres un arquitecto de software experto. Genera un documento de arquitectura para el siguiente proyecto:
    
    Nombre: ${input.name}
    Descripción: ${input.description}
    
    El documento debe incluir:
    - Descripción general del proyecto
    - Arquitectura del sistema (frontend, backend, base de datos)
    - Componentes principales
    - Flujo de datos
    - Consideraciones de seguridad
    - Estrategia de escalabilidad
    
    Formato: Markdown
    Idioma: Español
  `;

  const arquitecturaResponse = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'Eres un arquitecto de software experto que genera documentación técnica clara y detallada.' },
      { role: 'user', content: arquitecturaPrompt }
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const arquitectura = arquitecturaResponse.choices[0].message.content || '';

  // Generate todolist document
  const todolistPrompt = `
    Eres un project manager experto. Genera un plan de desarrollo (todolist) para el siguiente proyecto:
    
    Nombre: ${input.name}
    Descripción: ${input.description}
    
    El plan debe incluir:
    - 5 fases de desarrollo con duraciones estimadas
    - Tareas específicas para cada fase
    - Consideraciones adicionales
    
    Formato: Markdown con checklist
    Idioma: Español
  `;

  const todolistResponse = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'Eres un project manager experto que crea planes de desarrollo detallados y realistas.' },
      { role: 'user', content: todolistPrompt }
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const todolist = todolistResponse.choices[0].message.content || '';

  return {
    arquitectura,
    todolist,
  };
}