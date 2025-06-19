import ProjectForm from '@/components/ProjectForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          SaaS Planner
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Genera arquitectura y planificación para tu proyecto SaaS de forma automática.
          Describe tu idea y obtén documentación profesional en segundos.
        </p>
        <ProjectForm />
      </div>
    </main>
  );
}