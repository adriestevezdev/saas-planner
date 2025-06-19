-- Note: Database creation is handled by docker-compose POSTGRES_DB environment variable
-- Connect to the saas_planner database
\c saas_planner;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    architecture TEXT,
    todolist TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);

-- Insert sample templates
INSERT INTO templates (name, description, category, content) VALUES
('SaaS Starter', 'Basic SaaS application template', 'web', '# SaaS Starter Template\n\n## Architecture\n- Frontend: React/Next.js\n- Backend: Node.js/Express\n- Database: PostgreSQL\n- Auth: JWT\n\n## Features\n- User authentication\n- Dashboard\n- Subscription management'),
('E-commerce', 'E-commerce platform template', 'web', '# E-commerce Template\n\n## Architecture\n- Frontend: Next.js\n- Backend: Node.js\n- Database: PostgreSQL\n- Payment: Stripe\n\n## Features\n- Product catalog\n- Shopping cart\n- Payment processing\n- Order management'),
('Mobile App', 'Mobile application template', 'mobile', '# Mobile App Template\n\n## Architecture\n- Frontend: React Native\n- Backend: Node.js/Express\n- Database: MongoDB\n- Auth: Firebase\n\n## Features\n- User authentication\n- Push notifications\n- Offline support\n- Real-time updates')
ON CONFLICT DO NOTHING;