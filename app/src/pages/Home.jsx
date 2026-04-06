import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          🚀 EventFlow
        </h1>

        <p className="text-muted-foreground mb-6">
          Plataforma de Eventos com Check-in
        </p>

        <Link
          to="/dashboard"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90"
        >
          Entrar
        </Link>
      </div>
    </div>
  );
}
