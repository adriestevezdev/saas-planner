# SaaS Planner

AI-powered tool to generate comprehensive project architecture and roadmaps for your SaaS ideas.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd saas-planner
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL database on port 5432
   - Backend API on port 3001
   - Frontend on port 3000

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database: postgresql://admin:password123@localhost:5432/saas_planner

### Manual Setup (Alternative)

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Database Setup**
   ```bash
   # Start PostgreSQL container only
   docker-compose up postgres -d
   ```

## 📁 Project Structure

```
saas-planner/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   └── components/      # React components
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── models/         # Database models
│   │   ├── config/         # Configuration
│   │   └── types/          # TypeScript types
│   └── package.json
├── docker-compose.yml      # Docker services
└── init.sql               # Database initialization
```

## 🛠 Tech Stack

### Frontend
- Next.js 15 with TypeScript
- Tailwind CSS
- React Flow (for canvas)
- Zustand (state management)

### Backend
- Node.js with TypeScript
- Express.js
- PostgreSQL
- JWT Authentication

### Development
- Docker & Docker Compose
- ESLint & Prettier
- Hot reload for both frontend and backend

## 📝 API Endpoints

- `GET /health` - Health check
- `POST /api/projects/generate` - Generate new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild services
docker-compose up --build

# Reset database
docker-compose down -v
docker-compose up -d
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://admin:password123@localhost:5432/saas_planner
OPENAI_API_KEY=your_openai_key
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=http://localhost:3000
```

## 📋 Development Checklist

- [x] Project setup
- [x] Frontend with Next.js + TypeScript
- [x] Backend with Express + TypeScript
- [x] Docker development environment
- [x] PostgreSQL database
- [x] Basic API structure
- [ ] OpenAI integration
- [ ] Authentication system
- [ ] Canvas visualization
- [ ] Document generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.