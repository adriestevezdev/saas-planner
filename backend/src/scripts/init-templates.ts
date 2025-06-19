import dotenv from 'dotenv';
import { TemplateService } from '../services/template.service';

dotenv.config();

async function initializeTemplates() {
  try {
    console.log('Initializing default templates...');
    const templateService = new TemplateService();
    await templateService.createDefaultTemplates();
    console.log('✅ Default templates created successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing templates:', error);
    process.exit(1);
  }
}

initializeTemplates();